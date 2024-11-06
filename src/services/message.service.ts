// message.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SendMessageDto } from '../dto/message.dto';
import { Message } from '../schemas/message.schema';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class MessageService {
  @Client({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'messages_queue',
    },
  })
  client: ClientProxy;

  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async viewMessages(userId: string): Promise<Message[]> {
    // Retrieve messages from the database for a particular user
    return await this.messageModel.find({ userId }).exec();
  }

  async sendMessage(sendMessageDto: SendMessageDto, fromUserId: string): Promise<Message> {
    // Save the message to the database
    const message = new this.messageModel({
      fromUserId: fromUserId,
      toUserId: sendMessageDto.toUserId,
      message: sendMessageDto.message,
    });
    await message.save();

    // Send a RabbitMQ message to notify other users
    this.client.emit('new_message', sendMessageDto);

    return message;
  }
}
