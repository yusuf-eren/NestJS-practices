import { Module, ValidationPipe, MiddlewareConsumer } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { ReportsModule } from "./reports/reports.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
// Entities
import { User } from "./users/user.entity";
import { Report } from "./reports/report.entity";

const cookieSession = require("cookie-session");

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            // NODE_ENV values
            envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                return {
                    type: "sqlite", // db type
                    database: config.get<string>("DB_NAME"), // filename
                    entities: [User, Report], // entities
                    synchronize: true,
                    // This option when set to true,
                    // is going to cause typeOrm to take a look
                    // at the structure of all your different entities
                    // and then automatically update the structure
                    // of your database
                };
            },
        }),

        UsersModule,
        ReportsModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                whitelist: true,
            }),
        },
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(
                cookieSession({
                    // Secret key
                    keys: ["this_is_my_cookie_string"],
                }),
            ) // this means apply to all routes
            .forRoutes("*");
    }
}
