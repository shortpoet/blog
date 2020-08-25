"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.PostResolver = void 0;
var type_graphql_1 = require("type-graphql");
var Post_1 = require("../entity/Post");
var typeorm_1 = require("typeorm");
var chalkLog_1 = require("../utils/chalkLog");
var PostResolver = /** @class */ (function () {
    function PostResolver() {
    }
    // will return server error 500 if not set nullable: true
    PostResolver.prototype.post = function (id, info) {
        return __awaiter(this, void 0, Promise, function () {
            var post, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, typeorm_1.getRepository(Post_1.Post).findOne(id)];
                    case 1:
                        post = _a.sent();
                        return [2 /*return*/, post];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PostResolver.prototype.posts = function () {
        return __awaiter(this, void 0, Promise, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chalkLog_1.chalkLog('magentaBright', '#### database fetch ####');
                        return [4 /*yield*/, typeorm_1.getRepository(Post_1.Post).find()
                            // chalkLog('magenta', data)
                            // redis_client.setex('posts', 54000, JSON.stringify(data))
                        ];
                    case 1:
                        data = _a.sent();
                        // chalkLog('magenta', data)
                        // redis_client.setex('posts', 54000, JSON.stringify(data))
                        return [2 /*return*/, data];
                }
            });
        });
    };
    PostResolver.prototype.createPost = function (postInput) {
        return __awaiter(this, void 0, Promise, function () {
            var repo, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('#### create post ####');
                        repo = typeorm_1.getRepository(Post_1.Post);
                        return [4 /*yield*/, repo.save(postInput)];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results];
                }
            });
        });
    };
    PostResolver.prototype.updatePost = function (postInput) {
        return __awaiter(this, void 0, Promise, function () {
            var repo, oldPost, newPost, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('#### create post ####');
                        repo = typeorm_1.getRepository(Post_1.Post);
                        return [4 /*yield*/, repo.findOne(parseInt(postInput.id))];
                    case 1:
                        oldPost = _a.sent();
                        return [4 /*yield*/, repo.create(__assign(__assign({}, postInput), { id: oldPost.id }))];
                    case 2:
                        newPost = _a.sent();
                        return [4 /*yield*/, repo.save(newPost)];
                    case 3:
                        results = _a.sent();
                        return [2 /*return*/, results];
                }
            });
        });
    };
    PostResolver.prototype.deletePost = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var repo, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chalkLog_1.chalkLog('greenBright', '#### delete post ####');
                        repo = typeorm_1.getRepository(Post_1.Post);
                        return [4 /*yield*/, repo["delete"](id)];
                    case 1:
                        result = _a.sent();
                        chalkLog_1.chalkLog('magenta', "result");
                        chalkLog_1.chalkLog('magenta', result);
                        return [2 /*return*/, true];
                }
            });
        });
    };
    __decorate([
        type_graphql_1.Query(function (returns) { return Post_1.Post; }, { nullable: true }),
        __param(0, type_graphql_1.Arg('id')),
        __param(1, type_graphql_1.Info())
    ], PostResolver.prototype, "post");
    __decorate([
        type_graphql_1.Query(function (returns) { return [Post_1.Post]; })
    ], PostResolver.prototype, "posts");
    __decorate([
        type_graphql_1.Mutation(function (returns) { return Post_1.Post; }),
        __param(0, type_graphql_1.Arg("post"))
    ], PostResolver.prototype, "createPost");
    __decorate([
        type_graphql_1.Mutation(function (returns) { return Post_1.Post; }),
        __param(0, type_graphql_1.Arg("post"))
    ], PostResolver.prototype, "updatePost");
    __decorate([
        type_graphql_1.Mutation(function (returns) { return Boolean; }),
        __param(0, type_graphql_1.Arg("id"))
    ], PostResolver.prototype, "deletePost");
    PostResolver = __decorate([
        type_graphql_1.Resolver(function (of) { return Post_1.Post; })
    ], PostResolver);
    return PostResolver;
}());
exports.PostResolver = PostResolver;
