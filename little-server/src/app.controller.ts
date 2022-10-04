import { Controller, Get } from "@nestjs/common";

// this decorator is telling Nest that
// we are trying to create a class
// that is going to serve as a controller
// inside of our application
@Controller()
export class AppController {
    // @Get declares route of the app
    @Get("/a")
    getRootRoute() {
        return "hi there!";
    }

    @Get("/bye")
    getByeThere() {
        return "Bye";
    }
}

@Controller()
export class TestController {
    @Get("/hello")
    getRootRoute() {
        return "Hello thereeee";
    }
}
