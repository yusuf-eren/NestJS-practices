import { Controller, Module, Get } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

// this decorator is telling Nest that
// we are trying to create a class
// that is going to serve as a controller
// inside of our application
@Controller()
class AppController {
    // @Get declares route of the app
    @Get("/a")
    getRootRoute() {
        return "hi there!";
    }
}

@Controller()
class TestController {
    @Get("/hello")
    getRootRoute() {
        return "Hello thereeee";
    }
}

@Module({
    controllers: [AppController, TestController],
})
class AppModule {}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}

bootstrap();
