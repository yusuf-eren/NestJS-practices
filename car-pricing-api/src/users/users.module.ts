import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { User } from "./user.entity";

@Module({
  // forFeature is selects the given entity
  // and creates a repository for us
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
