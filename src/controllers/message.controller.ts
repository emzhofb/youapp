import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { MessageService } from '../services/message.service';
import { SendMessageDto } from '../dto/message.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('api')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  // View Messages
  @UseGuards(JwtAuthGuard)
  @Get('viewMessages')
  async viewMessages(@Req() req) {
    const userId = req.user._id; // Assumes `user._id` is available from JWT payload
    return this.messageService.viewMessages(userId);
  }

  // Send Message
  @UseGuards(JwtAuthGuard)
  @Post('sendMessage')
  async sendMessage(@Body() sendMessageDto: SendMessageDto, @Req() req) {
    const userId = req.user._id; // Assumes `user._id` is available from JWT payload
    return this.messageService.sendMessage(sendMessageDto, userId);
  }
}
