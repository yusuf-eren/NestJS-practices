import { Module } from "@nestjs/common";
import { AppController, TestController } from "./app.controller";
@Module({
    controllers: [AppController, TestController],
})
export class AppModule {}
