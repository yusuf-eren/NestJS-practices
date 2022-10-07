import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";

@Controller("auth")
export class UsersController {
  @Post("/signup")
  // We are getting the body of the request
  // then declaring it as body and
  // declaring type of body as 'CreateUserDto'
  createUser(@Body() body: CreateUserDto) {
    console.log(body);
  }
}
