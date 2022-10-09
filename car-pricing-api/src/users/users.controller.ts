import {
    Body,
    Controller,
    Post,
    Get,
    Patch,
    Param,
    Query,
    Delete,
    NotFoundException,
    Session,
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UsersService } from "./users.service";
import { Serialize } from "src/interceptors/serialize.interceptor";
import { UserDto } from "./dtos/user.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
// @Serialize() applies interceptor to all controllers under this route
// also we can still apply interceptor to specific controllers
// as an example: @Serialize(UpdateUserDto)
@Serialize(UserDto)
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
    ) {}

    @Get("/whoami")
    whoAmi(@Session() session: any) {
        return this.usersService.findOne(session.userId);
    }

    @Post("/signout")
    signOut(@Session() session: any) {
        session.userId = null;
    }

    @Post("/signup")
    // We are getting the body of the request
    // then declaring it as body and
    // declaring type of body as 'CreateUserDto'
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post("/signin")
    async loginUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    // Interceptor is works like a middleware but it works before
    // and after the controller.
    // @Serialize(UserDto)
    // We are getting the param of the request
    // but don't pass it as 'string' !!!
    // yes the param comes as a string
    // so we should use parseInt() for param
    @Get("/:id")
    async findUser(@Param("id") id: string) {
        const user = await this.usersService.findOne(parseInt(id));
        if (!user) throw new NotFoundException("user not found");

        return user;
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
