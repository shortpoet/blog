import { Resolver, Query, Arg, Info } from "type-graphql";
import { User } from "../entity/User";
import { getRepository } from "typeorm";
import { GraphQLResolveInfo } from "graphql";

@Resolver(of => User)
export class UserResolver {

  @Query(returns => User)
  async user(
    @Arg('id') id: number,
    @Info() info: GraphQLResolveInfo
    ): Promise<User> {
    
    // this joins on
    // INNER JOIN "content"."posts" "posts" ON "posts"."user_id"="user"."id" WHERE "user"."id" = $1
      // fails if no posts
    // const user = await getRepository(User)
    //   .createQueryBuilder('user')
    //   .innerJoinAndSelect('user.posts', 'posts')
    //   .where('user.id = :id', { id: id })
    //   .getOne();

    // eager: true must be set on entity for this to work with nested query
    const user = getRepository(User).findOne(id);
  
    // throwing error is cheaper than catching using try/catch
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    return user;
  }

  @Query(returns => [User])
  async users(): Promise<User[]> {
    return getRepository(User).find();
  }
}