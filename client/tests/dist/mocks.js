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
exports.__esModule = true;
exports.thisMonth = exports.thisWeek = exports.today = exports.basePost = void 0;
var moment_1 = require("moment");
exports.basePost = {
    id: 1,
    title: 'Base post',
    markdown: 'Content',
    html: '<p>Content</p>',
    userId: 1,
    created: moment_1["default"]()
};
exports.today = __assign(__assign({}, exports.basePost), { id: 888888888888888, title: 'Today' });
exports.thisWeek = __assign(__assign({}, exports.basePost), { id: 2, title: 'This Week', created: moment_1["default"]().subtract(2, 'days') });
exports.thisMonth = __assign(__assign({}, exports.basePost), { id: 3, title: 'This Month', created: moment_1["default"]().subtract(2, 'weeks') });
