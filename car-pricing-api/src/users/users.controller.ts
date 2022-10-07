import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";

@Controller("auth")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("/signup")
  // We are getting the body of the request
  // then declaring it as body and
  // declaring type of body as 'CreateUserDto'
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
  }
}
