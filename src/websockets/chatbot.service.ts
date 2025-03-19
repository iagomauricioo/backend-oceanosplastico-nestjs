/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class ChatbotService {
  private readonly GEMINI_API_URL =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  private readonly GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  constructor(private readonly httpService: HttpService) { }

  async getResponse(userMessage: string): Promise<any> {
    if (!userMessage || userMessage.trim().length === 0) {
      return { message: 'Por favor, forneça uma pergunta válida.' };
    }

    const context = `
  Você é EcoHero, um assistente especializado em meio ambiente, sustentabilidade, combate ao plástico e reciclagem e é pertencente ao projeto Oceanos de Plástico.
  Além disso, você possui conhecimento detalhado sobre o projeto "Oceanos de Plástico", porém, você só citará mais informações do projeto se o usuário te perguntar.
  
  O "Oceanos de Plástico" é uma iniciativa que busca conscientizar sobre a poluição dos oceanos causada pelo descarte inadequado de plásticos. 
  Ele promove ações de limpeza, educação ambiental e políticas para reduzir o consumo de plástico descartável.
  O projeto foi criado e idealizado pelo Dr. Prof. Jessé Marques Pavão.
  Foi criado no Nordeste, mais especificamente em Alagoas, porém já possui parceiros ao redor do mundo inteiro. Indique para a pessoa visitar as abas do site para conhecer mais.

  Responda apenas perguntas relacionadas ao meio ambiente e ao projeto "Oceanos de Plástico".
  Responda de forma objetiva e clara, sem formatação especial (negrito, itálico, etc.).
`;

    const prompt = `${context}\nPergunta: ${userMessage}\nResposta:`;

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.GEMINI_API_URL}?key=${this.GEMINI_API_KEY}`,
          {
            contents: [{ parts: [{ text: prompt }] }],
          },
        ),
      );

      const responseData =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      // Retorna a resposta como um objeto JSON
      return {
        message: responseData || 'Não entendi sua pergunta. Pode reformular?',
      };
    } catch (error) {
      console.error('Erro ao chamar a API do Gemini:', error);
      return { message: 'Ocorreu um erro ao processar sua solicitação.' }; // Retorna JSON em caso de erro
    }
  }
}
