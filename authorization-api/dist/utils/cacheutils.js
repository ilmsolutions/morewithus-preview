"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cache = require("memory-cache");
var cacheutils = /** @class */ (function () {
    function cacheutils(config) {
        this.config = {};
        this._cache = new cache.Cache();
        this.config = config;
    }
    cacheutils.Instance = function (config) {
        if (!this.instance) {
            this.instance = new cacheutils(config);
        }
        return this.instance;
    };
    cacheutils.prototype.put = function (key, value) {
        console.log('put ' + key);
        this._cache.put(key, value, this.config['maxAge'], function (key, value) {
            //console.log('cache entry for ' + key);
        });
    };
    cacheutils.prototype.get = function (key) {
        console.log('get ' + key);
        return this._cache.get(key);
    };
    cacheutils.prototype.delete = function (key) {
        console.log('delete ' + key);
        return this._cache.del(key);
    };
    cacheutils.prototype.keys = function () {
        return this._cache.keys();
    };
    return cacheutils;
}());
exports.CacheUtils = cacheutils.Instance({ maxAge: 60 * 60 * 1000 });
//# sourceMappingURL=cacheutils.js.map