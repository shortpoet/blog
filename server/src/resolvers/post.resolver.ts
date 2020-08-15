import { Resolver, Query, Arg, Info, Mutation } from "type-graphql";
import { Post } from "../entity/Post";
import { getRepository } from "typeorm";
import { GraphQLResolveInfo } from "graphql";
import { IPost } from "../interfaces/IPost";
import { PostInput } from "../inputs/post.input";

@Resolver(of => Post)
export class PostResolver {

  // will return server error 500 if not set nullable: true
  @Query(returns => Post, { nullable: true })
  async post(
    @Arg('id') id: string,
    @Info() info: GraphQLResolveInfo
  ): Promise<Post> {
    
    try {
      const post = await getRepository(Post).findOne(id);
      return post;
      
    } catch (error) {
      console.log(error);
      
    }
  
    // throwing error is cheaper than catching using try/catch
    // if (!user) {
    //   throw new Error(`Post with username ${username} not found`);
    // }

  }

  @Query(returns => [Post])
  async posts(): Promise<Post[]> {
    return getRepository(Post).find();
  }

  @Mutation(returns => Post)
  async createPost(@Arg("post") postInput: PostInput): Promise<Post> {
    console.log('#### create post ####');
    const repo = getRepository(Post);
    // first must make call to save else doesn't have context for sequential id
    await repo.find();
    const newPost = await repo.save(<Post>postInput)
    console.log(newPost.id);
    return newPost
  }
}