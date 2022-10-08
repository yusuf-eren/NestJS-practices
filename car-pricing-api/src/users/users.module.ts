import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { AuthService } from "./auth.service";

@Module({
    // forFeature is selects the given entity
    // and creates a repository for us
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService, AuthService],
})
export class UsersModule {}
