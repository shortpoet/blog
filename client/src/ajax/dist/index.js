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
exports.graphFetch = exports.graphAxios = void 0;
var axios_1 = require("axios");
var colorLog_1 = require("../../utils/colorLog");
// Add a request interceptor
axios_1["default"].interceptors.request.use(function (config) {
    console.log('intercept before');
    // Do something before request is sent
    // console.log(config);
    // console.log(config.validateStatus(200));
    // console.log(config.validateStatus(500));
    return config;
}, function (error) {
    console.log('intercept after');
    // Do something with request error
    console.log(error);
    return Promise.reject(error);
});
// query type corresponds to key for redis cache
exports.graphAxios = function (query, queryType) { return __awaiter(void 0, void 0, Promise, function () {
    var config, url, res, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // chalkLog('green', 'graphAxios')
                query = { query: query };
                config = {
                    validateStatus: function (status) { return status < 500; }
                };
                config.params = queryType ? { queryType: queryType } : null;
                url = (import.meta.env.VITE_APP_API ? import.meta.env.VITE_APP_API : process.env.VUE_APP_API) + "/graphql";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1["default"].post(url, query, config)
                    // chalkLog('green', 'graphAxios')
                    // chalkLog('blueBright', res)
                    // chalkLog('green', res.status)
                ];
            case 2:
                res = _a.sent();
                // chalkLog('green', 'graphAxios')
                // chalkLog('blueBright', res)
                // chalkLog('green', res.status)
                console.log(res);
                // console.log(res.status);
                if (res.status == 200) {
                    // chalkLog('green', "Graph Axios OK")
                    // colorLog("Graph Axios OK", 1);
                    // console.log(res);
                    return [2 /*return*/, res.data.data];
                }
                if (res.status == 500) {
                    // defaults to 0
                    colorLog_1.colorLog("Graph Axios NOT OK", new Number().valueOf());
                    return [2 /*return*/, res];
                }
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                if (error_1.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                }
                else if (error_1.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error_1.request);
                }
                else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error when fetching: " + error_1.message);
                }
                console.log(error_1.config);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.graphFetch = function (url, query) { return __awaiter(void 0, void 0, Promise, function () {
    var result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, window.fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            query: query
                        })
                    })];
            case 1:
                result = _a.sent();
                return [4 /*yield*/, result.json()];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                error_2 = _a.sent();
                console.log("Error when fetching: " + error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
