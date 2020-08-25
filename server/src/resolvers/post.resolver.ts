import { Resolver, Query, Arg, Info, Mutation } from "type-graphql";
import { Post } from "../entity/Post";
import { getRepository, DeleteResult, Any, SaveOptions } from "typeorm";
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
    // redis_client.setex('posts', 54000, JSON.stringify(data))
    return data;
  }

  @Mutation(returns => Post)
  async createPost(@Arg("post") postInput: CreatePostInput): Promise<Post> {
    console.log('#### create post ####');
    const repo = getRepository(Post);
    console.log(postInput);
    
    const postNum = await repo.findAndCount();
    const newId = postNum[1] + 1;
    const post = await repo.create({
      ...postInput,
      id: newId
    });
    console.log('test 1');
    
    console.log(post);
    console.log('test 2');
    console.log('test 3');
    const options: SaveOptions = {
      
    }
    const results = await repo.save(<Post>post, options);
    console.log(results);
    console.log('test 4');
    
    // below is for upsert
    // https://github.com/typeorm/typeorm/issues/1090
    // const data = post;
    // const row = Array.isArray(data) ? data[0] : data;
    // const keys = Object.keys(row);

    // if (keys.length < 1) {
    //   throw new Error("Cannot upsert without any values specified");
    // }
    // const primaryKey = 'id';
    // const updateStr = keys.map(key => `"${key}" = EXCLUDED."${key}"`).join(",");
    // const rest = keys.filter(key => key != primaryKey)
    // const results = repo
    //   .createQueryBuilder()
    //   .insert()
    //   .values(post)
    //   .orUpdate({ conflict_target: [`${primaryKey}`], overwrite: rest })
    //   .execute()

    // const results = await repo.findOne(newId);
    return results;
  }
  @Mutation(returns => Post)
  async updatePost(@Arg("post") postInput: UpdatePostInput): Promise<Post> {
    console.log('#### create post ####');
    const repo = getRepository(Post);
    const oldPost = await repo.findOne(parseInt(postInput.id));
    // console.log(oldPost);
    const newPost = await repo.create(<Post>{
      ...postInput,
      id: oldPost.id
    });
    // console.log(newPost);
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