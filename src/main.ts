import { Controller, Module } from "@nestjs/common";

// this decorator is telling Nest that
// we are trying to create a class
// that is going to serve as a controller
// inside of our application
@Controller()
class AppController {}
