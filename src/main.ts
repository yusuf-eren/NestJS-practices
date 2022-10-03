import { Controller, Module, Get } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

// this decorator is telling Nest that
// we are trying to create a class
// that is going to serve as a controller
// inside of our application
@Controller()
class AppController {
    @Get()
    getRootRoute() {
        return "hi there!";
    }
}

@Module({
    controllers: [AppController],
})
class AppModule {}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}
