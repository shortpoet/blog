import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn} from "typeorm";
import { ObjectType, Field, ID, Int, GraphQLISODateTime } from "type-graphql";
import { IPost } from "../interfaces/IPost";
import moment, { Moment } from "moment";
import { User } from "./User";


@ObjectType()
@Entity({ name: `content_posts`, schema: 'vcc' })
export class Post implements IPost {
  
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;
  
  @Field()
  @Column()
  title: string;
  
  @Field({ nullable: true })
  @Column({ nullable: true })
  markdown?: string;
  
  @Field({ nullable: true })
  @Column({ nullable: true })
  html?: string;
  
  @Field(type => GraphQLISODateTime)
  @Column({ type: 'timestamp', default: moment() })
  created: Moment;

  @Field(type => Int)
  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(type => User, user => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: User;

}
