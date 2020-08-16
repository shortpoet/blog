import { Resolver, Query, Arg, Info, Mutation } from "type-graphql";
import { User } from "../entity/User";
import { getRepository } from "typeorm";
import { GraphQLResolveInfo } from "graphql";
import { ICreateUser } from "../interfaces/ICreateUser";
import { IUser } from "../interfaces/IUser";
import { UserInput } from "../inputs/user.input";
import { chalkLog } from "../utils/colorLog";
const redis = require("redis");
const redis_client = redis.createClient(6379)

@Resolver(of => User)
export class UserResolver {

  // will return server error 500 if not set nullable: true
  @Query(returns => User, { nullable: true })
  async user(
    @Arg('username') username: string,
    @Info() info: GraphQLResolveInfo
    ): Promise<User> {
    console.log(username);
    // this joins on
    // INNER JOIN "content"."posts" "posts" ON "posts"."user_id"="user"."id" WHERE "user"."id" = $1
      // fails if no posts
    // const user = await getRepository(User)
    //   .createQueryBuilder('user')
    //   .innerJoinAndSelect('user.posts', 'posts')
    //   .where('user.id = :id', { id: id })
    //   .getOne();

    // eager: true must be set on entity for this to work with nested query
    // const user = getRepository(User).findOne(id);
    // const user = await getRepository(User).findOneOrFail({ username: username });
    try {
      const user = await getRepository(User).findOne({ username: username });
      return user;
      
    } catch (error) {
      console.log(error);
      
    }
  
    // throwing error is cheaper than catching using try/catch
    // if (!user) {
    //   throw new Error(`User with username ${username} not found`);
    // }

  }

  @Query(returns => User)
  async userById(
    @Arg('id') id: number,
    @Info() info: GraphQLResolveInfo
    ): Promise<User> {
  
    // throwing error is cheaper than catching using try/catch
    const user = await getRepository(User).findOne(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }


  @Query(returns => [User])
  async users(): Promise<User[]> {
    const usersPromise = getRepository(User).find();
    const users = await usersPromise;
    try {
      chalkLog('magenta', users)
      redis_client.setex('users', 54000, JSON.stringify(users))
    } catch (error) {
      console.log(error);
    }

    return usersPromise;
  }

  @Mutation(returns => User)
  async createUser(@Arg("user") userInput: UserInput): Promise<User> {
    const { username, password } = userInput;
    console.log('#### create user ####');
    
    console.log(username);
    console.log(userInput);
    const repo = getRepository(User);
    // first must make call to save else doesn't have context for sequential id
    await repo.find();
    const newUser = await repo.save(<User>userInput)
    console.log(newUser.id);
    return newUser
  }
}