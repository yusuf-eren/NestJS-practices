import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UsersService } from "../users.service";
import { User } from "../user.entity";

// THAT IS REALLY IMPORTANT
// GO FIND THE EXPRESS LIBRARY,
// FIND THE INTERFACE CALLED REQUEST,
// AND ADD ONE MORE PROPERTY
declare global {
    namespace Express {
        interface Request {
            currentUser?: User;
        }
    }
}

export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private usersService: UsersService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.session || {};
        if (userId) {
            const user = await this.usersService.findOne(userId);
            req.currentUser = user;
        }

        next();
    }
}