import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
// all of these are decorators

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;
}
