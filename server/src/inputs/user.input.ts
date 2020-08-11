import { InputType, Field } from "type-graphql";
import { IUser } from "../interfaces/IUser";
import { User } from "../entity/User";

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  username: string;
  @Field()
  password: string;
}