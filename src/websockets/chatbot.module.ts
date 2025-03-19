import { Module } from '@nestjs/common';
import { ChatbotGateway } from './chatbot.gateway';
import { ChatbotService } from './chatbot.service';
import { HttpModule } from '@nestjs/axios';
import { ChatbotController } from './chatbot.controller';

@Module({
  imports: [HttpModule],
  controllers: [ChatbotController],
  providers: [ChatbotGateway, ChatbotService],
})
export class ChatbotModule {}
