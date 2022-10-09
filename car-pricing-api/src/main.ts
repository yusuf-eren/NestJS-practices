import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
const cookieSession = require("cookie-session");

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(
        cookieSession({
            // Secret key
            keys: ["this_is_my_cookie_string"],
        }),
    );
    app.useGlobalPipes(
        new ValidationPipe({
            // if set to true, validator will strip
            // validated object of any properties
            // that do not use any validation decorators
            whitelist: true,
        }),
    );
    await app.listen(3000);
}
bootstrap();
