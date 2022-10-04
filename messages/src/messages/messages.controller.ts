import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';

// route '/message'
@Controller('messages')
export class MessagesController {
  @Get()
  listMessages() {}
  @Post()
  // Data Transfer Object (DTO)
  // CreateMessageDto is a validator
  // for the body object
  createMessage(@Body() body: CreateMessageDto) {
    console.log(body);
  }
  @Get('/:id')
  getMessage(@Param('id') id: string) {}
}
