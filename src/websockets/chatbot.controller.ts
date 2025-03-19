/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Post } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('ask')
  async askQuestion(@Body('question') question: string): Promise<string> {
    return await this.chatbotService.getResponse(question);
  }
}
