import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private repo: Repository<User>,
    ) {}

    create(email: string, password: string) {
        // creating a user. create() function does not
        // persist or save any information inside of your database
        // it takes in some information, creates a new instance of
        // a user entity, and then assigns that data you supplied
        // to create to that entity
        const user = this.repo.create({ email, password });

        // saving to database. save() method is
        // what actually takes an entity and saves
        // it into our database
        return this.repo.save(user);
    }

    // finds first user with given id
    // (ids are unique but this is just an example)
    findOne(id: number) {
        if (!id) {
            throw new NotFoundException(
                "userId is not found. (you are not logged in)",
            );
        }
        return this.repo.findOneBy({ id });
    }

    // finds all the different users with
    // the email passed to the function
    find(email: string) {
        return this.repo.find({ where: { email } });
    }

    // Partial<User> User is references to the User Entity
    // Partial is a type helper defined in TypeScript
    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id);
        if (!user) throw new NotFoundException("user not found");

        // Object.assign method copies all enumerable
        // own properties from the given source(second element)
        // to target object(first element)
        // NOTE: It modifies user object
        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        if (!user) throw new NotFoundException("user not found");

        return this.repo.remove(user);
    }
}

// const userService = new UsersService({} as any);
// userService.update(1, {
//   email: "asdsdsaasdas@gmail.com",
//   password: "updatedPassword",
// });
