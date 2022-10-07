import { Injectable } from "@nestjs/common";
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
}
