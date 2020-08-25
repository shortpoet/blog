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
  @Column({ type: 'datetime', default: moment() })
  created: Moment;

  @Field(type => Int)
  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(type => User, user => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: User;

}


// postgres

// query: SELECT "Post"."id" AS "Post_id", "Post"."title" AS "Post_title", "Post"."markdown" AS "Post_markdown", "Post"."html" AS "Post_html", "Post"."created" AS "Post_created", "Post"."user_id" AS "Post_user_id" FROM "vcc"."content_posts" "Post" WHERE "Post"."id" IN ($1) -- PARAMETERS: [4]
// query: START TRANSACTION
// query: INSERT INTO "vcc"."content_posts"("title", "markdown", "html", "created", "user_id") VALUES ($1, $2, $3, $4, $5) RETURNING "id", "created" -- PARAMETERS: ["New Post","select * from vcc.admin_users;","<p>select * from vcc.admin_users;</p>","2020-08-26T01:35:03.000Z",4]
// query: COMMIT

// mssql

// query: SELECT "Post"."id" AS "Post_id", "Post"."title" AS "Post_title", "Post"."markdown" AS "Post_markdown", "Post"."html" AS "Post_html", "Post"."created" AS "Post_created", "Post"."user_id" AS "Post_user_id" FROM "vcc"."content_posts" "Post" WHERE "Post"."id" IN (@0) -- PARAMETERS: [4]
// query: BEGIN TRANSACTION
// query: DECLARE @OutputTable TABLE ("id" int, "created" datetime);

// INSERT INTO "vcc"."content_posts"("title", "markdown", "html", "created", "user_id") OUTPUT INSERTED."id", INSERTED."created" INTO @OutputTable VALUES (@0, @1, @2, @3, @4);

// SELECT * FROM @OutputTable -- PARAMETERS: [{"value":"New Post","type":"nvarchar","params":[]},{"value":"select * from vcc.admin_users;","type":"nvarchar","params":[]},{"value":"<p>select * from vcc.admin_users;</p>","type":"nvarchar","params":[]},{"value":"2020-08-26T01:35:03.000Z","type":"datetime","params":[]},{"value":4,"type":"int","params":[]}]
// query failed: DECLARE @OutputTable TABLE ("id" int, "created" datetime);

// INSERT INTO "vcc"."content_posts"("title", "markdown", "html", "created", "user_id") OUTPUT INSERTED."id", INSERTED."created" INTO @OutputTable VALUES (@0, @1, @2, @3, @4);