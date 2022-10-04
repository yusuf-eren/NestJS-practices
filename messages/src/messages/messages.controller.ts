import { Controller, Get, Post } from '@nestjs/common';

// route '/message'
@Controller('messages')
export class MessagesController {
  @Get()
  listMessages() {
    
  }
  @Post()
  createMessage(){
    
  }
  @Get('/:id')
  getMessage(){
    
  }
}
