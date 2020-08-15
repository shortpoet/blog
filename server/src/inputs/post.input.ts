import { Field, Int, GraphQLISODateTime, InputType } from "type-graphql";
import { IPost } from "../interfaces/IPost";
import { Post } from "../entity/Post";
import moment, { Moment } from "moment";

@InputType()
export class PostInput implements Partial<Post> {
  
  @Field()
  title: string;
  
  @Field({ nullable: true })
  markdown?: string;
  
  @Field({ nullable: true })
  html?: string;
  
  @Field(type => GraphQLISODateTime)
  created: Moment;

  @Field(type => Int)
  userId: number;

}