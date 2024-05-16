import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

import { AddMessageDto } from './dto/addMessage.dto';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('ChatGateway');

  logReceivedMessage(author: string, body: string) {
    this.logger.log(`Received message: ${author} - ${body}`);
  }

  logSentMessage(author: string, body: string) {
    this.logger.log(`Sent message: ${author} - ${body}`);
  }

  @SubscribeMessage('chat')
  handleMessage(@MessageBody() payload: AddMessageDto): AddMessageDto {
    this.logReceivedMessage(payload.author, payload.body);
    this.server.emit('chat', payload);
    this.logSentMessage(payload.author, payload.body);
    return payload;
  }

  handleConnection(socket: Socket) {
    this.logger.log(`Socket connected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    this.logger.log(`Socket disconnected: ${socket.id}`);
  }
}