"use strict";
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
exports.Context = void 0;
var express = require("express");
var cors = require("cors");
var typeorm_1 = require("typeorm");
var graphqlHTTP = require('express-graphql').graphqlHTTP;
var generateSchema_1 = require("./utils/generateSchema");
var user_resolver_1 = require("./resolvers/user.resolver");
var User_1 = require("./entity/User");
var post_resolver_1 = require("./resolvers/post.resolver");
var loggingMiddleware_1 = require("./middleware/loggingMiddleware");
var redisMiddleware_1 = require("./middleware/redisMiddleware");
// const config = require('../ormconfig.js');
var Context = /** @class */ (function () {
    function Context(req) {
        this.req = req;
    }
    return Context;
}());
exports.Context = Context;
var util = require('util');
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var connection, context, app, schema_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("$# START @7");
                return [4 /*yield*/, typeorm_1.createConnection()];
            case 1:
                connection = _a.sent();
                return [4 /*yield*/, typeorm_1.getConnection().getRepository(User_1.User).find()];
            case 2:
                context = _a.sent();
                console.log(context);
                if (!connection) return [3 /*break*/, 4];
                app = express();
                app.use(cors());
                console.log("$# REDIS @7");
                console.log(process.env.REDIS_CACHE_DISABLE);
                console.log("$# TEST @7");
                if (process.env.DOCKER && process.env.REDIS_CACHE_DISABLE != 'true') {
                    console.log("$# USING REDIS @7");
                    app.use(redisMiddleware_1.redisMiddleware);
                    console.log("$# TEST 2 @7");
                }
                console.log("$# TEST 3 @7");
                app.use(loggingMiddleware_1.loggingMiddleware);
                return [4 /*yield*/, generateSchema_1.generateSchema(user_resolver_1.UserResolver, post_resolver_1.PostResolver)];
            case 3:
                schema_1 = _a.sent();
                app.use('/graphql', graphqlHTTP(function (req) { return ({
                    schema: schema_1,
                    graphiql: true
                }); }));
                app.listen(process.env.APP_PORT || 5000);
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); })();
