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
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../../models/admin/config");
function getConfigs(path, filter) {
    return config_1.Config.find(__assign({ path: path }, filter), function (err, configs) {
        if (err)
            return null;
        return configs;
    });
}
exports.getConfigs = getConfigs;
//# sourceMappingURL=config.js.map