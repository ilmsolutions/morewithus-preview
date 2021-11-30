"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cacheutils_1 = require("../../utils/cacheutils");
var config_1 = require("../../models/admin/config");
function get(key, cb) {
    var data = cacheutils_1.CacheUtils.get(key);
    cb = cb || (function (err, res) { return !err ? res : null; });
    if (!data) {
        console.log('missing data in cache for ' + key);
        return retrieve(key, function (err, result) {
            if (!err && result)
                cacheutils_1.CacheUtils.put(key, result);
            if (cb)
                cb(err, result);
        });
    }
    else
        return cb(null, data);
}
exports.get = get;
function expire(key) {
    var del = cacheutils_1.CacheUtils.delete(key);
    //console.log('expire status ' + del);
}
exports.expire = expire;
function set(key, cb) {
    retrieve(key, cb);
}
exports.set = set;
function retrieve(key, cb) {
    var key = key;
    var patt = new RegExp('^,' + key + ',', 'i');
    //console.log('coming through...' + key);
    var sort = {};
    var filter = { path: patt };
    switch (true) {
        case /subscriptions/i.test(key):
            sort = { 'custom.price': 1 };
            break;
        default:
            sort = { order: 1 };
            filter = Object.assign({}, filter, {
                active: true
            });
    }
    config_1.Config.find(filter).sort(sort).exec(cb);
}
//# sourceMappingURL=staticsettings.js.map