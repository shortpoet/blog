import { Resolver, Query, Arg, Info, Mutation } from "type-graphql";
import { Post } from "../entity/Post";
import { getRepository, DeleteResult, Any } from "typeorm";
import { GraphQLResolveInfo } from "graphql";
import { IPost } from "../interfaces/IPost";
import { CreatePostInput, UpdatePostInput } from "../inputs/post.input";
import { redis_client } from "../middleware/redisMiddleware";
import { chalkLog } from "../utils/chalkLog";

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
    chalkLog('magentaBright', '#### database fetch ####')
    const data = await getRepository(Post).find()
    // chalkLog('magenta', data)
    redis_client.setex('posts', 54000, JSON.stringify(data))
    return data;
  }

  @Mutation(returns => Post)
  async createPost(@Arg("post") postInput: CreatePostInput): Promise<Post> {
    console.log('#### create post ####');
    const repo = getRepository(Post);
    const post = await repo.create(<Post>postInput);
    const results = await repo.save(<Post>post);
    return results;
  }
  @Mutation(returns => Post)
  async updatePost(@Arg("post") postInput: UpdatePostInput): Promise<Post> {
    console.log('#### create post ####');
    const repo = getRepository(Post);
    const oldPost = await repo.findOne(parseInt(postInput.id));
    const newPost = await repo.create(<Post>{
      ...postInput,
      id: oldPost.id
    });
    const results = await repo.save(<Post>newPost);
    return results;
  }

  @Mutation(returns => Boolean)
  async deletePost(@Arg("id") id: string) {
    chalkLog('greenBright' ,'#### delete post ####');
    const repo = getRepository(Post);
    // const result = await repo.remove(await repo.findOne(id))
    // chalkLog('magenta', "result")
    // chalkLog('magenta', result)
    // return await repo.remove(await repo.findOne(id));
    const result =  await repo.delete(id)
    chalkLog('magenta', "result")
    chalkLog('magenta', result)
    return true
  }
}