import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);

  // global pipes are applied to all controllers
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
