import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatbotService } from './chatbot.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatbotGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatbotService: ChatbotService) {}

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: { message: string }) {
    console.log(`Recebido: ${data.message}`);

    const response = await this.chatbotService.getResponse(data.message);

    this.server.emit('response', { message: response });
  }
}
