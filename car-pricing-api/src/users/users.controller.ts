import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
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

  // We are getting the param of the request
  // but don't pass it as 'string' !!!
  // yes the param comes as a string
  // so we should use parseInt() for param
  @Get("/:id")
  findUser(@Param("id") id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Get()
  findAllUsers(@Query("email") email: string) {
    return this.usersService.find(email);
  }

  @Delete("/:id")
  deleteUser(@Param("id") id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch("/:id")
  updateUser(@Param("id") id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
