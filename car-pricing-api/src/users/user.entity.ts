import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";
// all of these are decorators

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;

  // whenever we inster a new user into our database
  // this functionright here should be executed
  // NOTE : If we insert, update, or remove to db
  // without creating an instance, Hooks are not going to execute
  // that means we can not log insert, update, and remove.
  @AfterInsert()
  logInsert() {
    console.log(`Inserted User with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate(){
    console.log(`Updated User with id ${this.id}`);
  }

  @AfterRemove()
  logRemove(){
    console.log(`Remove User with id ${this.id}`);
  }
}
