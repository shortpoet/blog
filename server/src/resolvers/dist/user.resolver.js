"use strict";
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
exports.UserResolver = void 0;
var type_graphql_1 = require("type-graphql");
var User_1 = require("../entity/User");
var typeorm_1 = require("typeorm");
var chalkLog_1 = require("../utils/chalkLog");
var UserResolver = /** @class */ (function () {
    function UserResolver() {
    }
    // will return server error 500 if not set nullable: true
    UserResolver.prototype.user = function (username, info) {
        return __awaiter(this, void 0, Promise, function () {
            var user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(username);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne({ username: username })];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserResolver.prototype.userById = function (id, info) {
        return __awaiter(this, void 0, Promise, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne(id)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error("User with id " + id + " not found");
                        }
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserResolver.prototype.users = function () {
        return __awaiter(this, void 0, Promise, function () {
            var usersPromise, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        usersPromise = typeorm_1.getRepository(User_1.User).find();
                        return [4 /*yield*/, usersPromise];
                    case 1:
                        users = _a.sent();
                        // users.forEach(u => Object.entries(u).forEach(([k,v]) => chalkLog('magenta',`${k} is ${v}: ${typeof v}`)))
                        try {
                            chalkLog_1.chalkLog('magentaBright', '#### database fetch ####');
                            // chalkLog('magenta', users)
                            // redis_client.setex('users', 54000, JSON.stringify(users))
                        }
                        catch (error) {
                            console.log(error);
                        }
                        return [2 /*return*/, usersPromise];
                }
            });
        });
    };
    UserResolver.prototype.createUser = function (userInput) {
        return __awaiter(this, void 0, Promise, function () {
            var username, password, repo, user, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = userInput.username, password = userInput.password;
                        console.log('#### create user ####');
                        repo = typeorm_1.getRepository(User_1.User);
                        return [4 /*yield*/, repo.create(userInput)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, repo.save(user)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, results];
                }
            });
        });
    };
    __decorate([
        type_graphql_1.Query(function (returns) { return User_1.User; }, { nullable: true }),
        __param(0, type_graphql_1.Arg('username')),
        __param(1, type_graphql_1.Info())
    ], UserResolver.prototype, "user");
    __decorate([
        type_graphql_1.Query(function (returns) { return User_1.User; }),
        __param(0, type_graphql_1.Arg('id')),
        __param(1, type_graphql_1.Info())
    ], UserResolver.prototype, "userById");
    __decorate([
        type_graphql_1.Query(function (returns) { return [User_1.User]; })
    ], UserResolver.prototype, "users");
    __decorate([
        type_graphql_1.Mutation(function (returns) { return User_1.User; }),
        __param(0, type_graphql_1.Arg("user"))
    ], UserResolver.prototype, "createUser");
    UserResolver = __decorate([
        type_graphql_1.Resolver(function (of) { return User_1.User; })
    ], UserResolver);
    return UserResolver;
}());
exports.UserResolver = UserResolver;
