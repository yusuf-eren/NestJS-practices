import { Module, MiddlewareConsumer } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { AuthService } from "./auth.service";
// import { CurrentUserInterceptor } from "./interceptors/current-user.interceptor";
// import { APP_INTERCEPTOR } from "@nestjs/core";
import { CurrentUserMiddleware } from "./middlewares/current-user.middleware";

@Module({
    // forFeature is selects the given entity
    // and creates a repository for us
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [
        UsersService,
        AuthService,
        // THIS IS A GLOBAL INTERCEPTOR FOR THIS CONTROLLER
        // -----------------------------------------------
        // This interceptor is getting session.userId and
        // finding user by using findOne()
        // then it adds it into request as "currentUser"
        // --- request.currentUser ---
        // {
        //     provide: APP_INTERCEPTOR,
        //     useClass: CurrentUserInterceptor,
        // },
    ],
})
export class UsersModule {
    // NOTE: THAT MIDDLEWARE DOES EXACTLY THE SAME WHAT INTERCEPTOR DOES!!!
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CurrentUserMiddleware).forRoutes("*");
    }
}
