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
exports.makeRouter = exports.router = exports.routes = void 0;
var vue_router_1 = require("vue-router");
var store_1 = require("../store");
var Home_vue_1 = require("../views/Home.vue");
var NewPost_vue_1 = require("../components/NewPost.vue");
var EditPost_vue_1 = require("../components/EditPost.vue");
var ShowPost_vue_1 = require("../components/ShowPost.vue");
var colorLog_1 = require("../../utils/colorLog");
var useStorage_1 = require("../composables/useStorage");
var constants_1 = require("../constants");
exports.routes = [
    {
        name: 'Home',
        path: '/',
        component: Home_vue_1["default"]
    },
    {
        name: 'ShowPost',
        path: '/posts/:id',
        component: ShowPost_vue_1["default"]
    },
    {
        name: 'NewPost',
        path: '/posts/new',
        component: NewPost_vue_1["default"],
        meta: {
            requiresAuth: true
        },
        props: {
            currentUserId: store_1.store.getState().authors.currentId
        }
    },
    {
        name: 'EditPost',
        path: '/posts/:id/edit',
        component: EditPost_vue_1["default"],
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/:catchAll(.*)',
        component: Home_vue_1["default"]
    }
];
// console.log("$# DOCKER @7");
// console.log(process.env);
// console.log(process.env.DOCKER);
// console.log('meta');
// console.log(import.meta.env.VITE_DOCKER);
// console.log('after');
// console.log(process.env.VITE_DOCKER);
// console.log(process.env.NODE_ENV);
// console.log(process.env.VUE_APP_DOCKER);
// console.log(process.env.NODE_ENV);
var base = process.env.DOCKER == '1'
    ? ''
    : process.env.NODE_ENV == 'production'
        ? 'blog'
        : '';
exports.router = vue_router_1.createRouter({
    // this sets baseurl
    // https://github.com/shortpoet/blog
    // http://localhost/blog/
    // adding a 'blog' here creates an error in nginx on reload 
    // chunk doesn't seem to get done properly unexpected token '<'
    // generic error beginning of html
    // https://github.com/coreui/coreui-free-react-admin-template/issues/124
    // https://github.com/coreui/coreui-free-react-admin-template/issues/124#issuecomment-460113218
    // history: createWebHistory(base),
    history: vue_router_1.createWebHistory(),
    routes: exports.routes
});
exports.makeRouter = function () { return vue_router_1.createRouter({
    history: vue_router_1.createWebHistory(),
    routes: exports.routes
}); };
var checkSessionStorage = function () { return __awaiter(void 0, void 0, void 0, function () {
    var localStorage, currentUserId, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                localStorage = useStorage_1.useStorage();
                colorLog_1.colorLog('Check Session Storage', 1);
                currentUserId = localStorage.get(constants_1.CURRENT_USER_ID_STORAGE_KEY);
                if (!currentUserId) return [3 /*break*/, 2];
                return [4 /*yield*/, store_1.store.getUserById(parseInt(currentUserId))];
            case 1:
                res = _a.sent();
                store_1.store.setCurrentUser(res.userById);
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
// https://github.com/vuejs/vue-router-next/blob/master/playground/router.ts
// redirect catch-all
// router.beforeEach((to, from, next) => {
//   if (/.\/$/.test(to.path)) {
//     to.meta.redirectCode = 301
//     next(to.path.replace(/\/$/, ''))
//   } else next()
//   // next()
// })
exports.router.beforeEach(function (to, from, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        checkSessionStorage();
        console.log('Navigate');
        // if you don't check for to.meta.requiresAuth will cause infinite loop of redirection
        if (to.meta.requiresAuth && !store_1.store.getState().authors.currentId) {
            next({
                name: 'Home'
            });
        }
        else {
            next();
        }
        return [2 /*return*/];
    });
}); });
