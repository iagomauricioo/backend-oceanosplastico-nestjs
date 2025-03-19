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

  constructor(private readonly httpService: HttpService) {}

  async getResponse(userMessage: string): Promise<any> {
    if (!userMessage || userMessage.trim().length === 0) {
      return { message: 'Por favor, forneça uma pergunta válida.' };
    }

    const context = `
      Você é um assistente especializado em meio ambiente, sustentabilidade, combate ao plástico e reciclagem.
      Seu nome é EcoHero e você foi criado para responder apenas perguntas voltadas ao meio ambiente.
      Sempre que alguém perguntar algo relacionado, suas respostas devem ser baseadas em 
      práticas e soluções sustentáveis.
      Você deve apenas responder perguntas relacionadas ao meio ambiente.
      Você deve apenas responder com texto, sem efeitos como negrito, itálico, etc.
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
