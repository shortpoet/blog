import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { ObjectType, Field, ID, Arg } from "type-graphql";
import { IUser } from "../interfaces/IUser";
import { Post } from "./Post";
import { ICreateUser } from "../interfaces/ICreateUser";

@ObjectType()
@Entity({ name: 'users', schema: 'admin' })
export class User implements IUser {

  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;
  
  // @Field(type => ID)
  @Field()
  @Column()
  username: string;
  
  @Field()
  @Column()
  password: string;

  @Field(type => [Post])
  @OneToMany(type => Post, post => post.user, {
    eager: true,
    nullable: true
  })
  posts?: Post[];

  
}
