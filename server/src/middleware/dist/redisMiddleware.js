"use strict";
exports.__esModule = true;
exports.redisMiddleware = exports.redis_client = void 0;
var chalkLog_1 = require("../utils/chalkLog");
var redis = require("redis");
console.log("$# REDIS Config @7");
var RedisMock = /** @class */ (function () {
    function RedisMock() {
    }
    RedisMock.prototype.get = function () {
        return {};
    };
    RedisMock.prototype.setex = function () {
        return {};
    };
    return RedisMock;
}());
var redis_mock = new RedisMock();
var makeClient = function () {
    console.log('redis client');
    console.log(process.env.REDIS_CACHE_DISABLE);
    if (process.env.REDIS_CACHE_DISABLE == 'true') {
        chalkLog_1.chalkLog('blueBright', "redis disable true");
        return redis_mock;
    }
    else {
        chalkLog_1.chalkLog('blueBright', "redis disable false");
        console.log('redis disable false');
        return process.env.DOCKER
            ? redis.createClient(process.env.REDIS_PORT, process.env.REDIS_SERVICE)
            : redis.createClient(process.env.REDIS_PORT);
    }
};
exports.redis_client = makeClient();
exports.redisMiddleware = function (req, res, next) {
    // console.log(Object.keys(req));
    chalkLog_1.chalkLog('green', '#### redis middleware ####');
    var queryType = req.query.queryType;
    if (queryType) {
        chalkLog_1.chalkLog('blueBright', "queryType: " + queryType);
        chalkLog_1.chalkLog('green', exports.redis_client);
        exports.redis_client.get(queryType, function (err, data) {
            chalkLog_1.chalkLog("yellow", "redis_client get");
            if (err) {
                chalkLog_1.chalkLog('red', err);
                res.status(500).send(err);
            }
            if (data != null) {
                // chalkLog('yellow', JSON.parse(data))
                var out = { data: {} };
                out.data[queryType.toString()] = JSON.parse(data);
                res.send(out);
            }
            else {
                next();
            }
        });
    }
    else {
        next();
    }
};
