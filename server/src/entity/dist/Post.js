"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Post = void 0;
var typeorm_1 = require("typeorm");
var type_graphql_1 = require("type-graphql");
var moment_1 = require("moment");
var User_1 = require("./User");
// i'm thinking because 
// entity imports happen first then 
// the redis client was being exported 
// so it was hit earlier in the build chain
// moved it here so env var is not undefined
require("dotenv").config();
console.log("$# Entity Config @7");
console.log("$# PROVIDER @7");
console.log(process.env.PROVIDER);
var dateType = process.env.PROVIDER == 'postgres' ? 'timestamp' : 'datetime';
console.log(dateType);
var Post = /** @class */ (function () {
    function Post() {
    }
    __decorate([
        type_graphql_1.Field(function (type) { return type_graphql_1.ID; }),
        typeorm_1.PrimaryGeneratedColumn()
    ], Post.prototype, "id");
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.Column()
    ], Post.prototype, "title");
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        typeorm_1.Column({ nullable: true })
    ], Post.prototype, "markdown");
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        typeorm_1.Column({ nullable: true })
    ], Post.prototype, "html");
    __decorate([
        type_graphql_1.Field(function (type) { return type_graphql_1.GraphQLISODateTime; }),
        typeorm_1.Column({ type: dateType, "default": moment_1["default"]() })
    ], Post.prototype, "created");
    __decorate([
        type_graphql_1.Field(function (type) { return type_graphql_1.Int; }),
        typeorm_1.Column({ name: 'user_id' })
    ], Post.prototype, "userId");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.User; }, function (user) { return user.posts; }),
        typeorm_1.JoinColumn({ name: 'user_id' })
    ], Post.prototype, "user");
    Post = __decorate([
        type_graphql_1.ObjectType(),
        typeorm_1.Entity({ name: "content_posts", schema: 'vcc' })
    ], Post);
    return Post;
}());
exports.Post = Post;
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
