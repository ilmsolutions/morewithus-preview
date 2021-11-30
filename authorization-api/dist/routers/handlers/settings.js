"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../../models/admin/config");
function getConfig(key, metaonly, cb) {
    cb = cb || (function (err, res) { return !err ? res : null; });
    var key = key;
    var patt = new RegExp('^,' + key + ',', 'i');
    //console.log('coming through...' + key);
    var sort = {}, projection = null, filter = { path: patt };
    switch (true) {
        case /subscriptions/i.test(key):
            sort = { 'custom.price': 1 };
            break;
        case /pages/i.test(key):
            if (metaonly)
                projection = { 'custom.body': 0 };
        default:
            sort = { order: 1 };
            filter = Object.assign({}, filter, {
                active: true
            });
    }
    return config_1.Config.find(filter, projection).sort(sort).exec(cb);
}
exports.getConfig = getConfig;
//# sourceMappingURL=settings.js.map