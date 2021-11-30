"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformSettings = function (data) {
    var _data = JSON.parse(JSON.parse(data));
    var __data = _data.map(function (d, i) {
        var _d = Object.assign({}, { label: d.label,
            value: d.label,
            children: [] });
        if (d && d.custom && d.custom.options) {
            _d.children = d.custom.options.map(function (opt) {
                return {
                    label: opt,
                    value: opt
                };
            });
        }
        return _d;
    });
    return __data;
};
exports.transformSubscriptionDTO = function (o) {
    var regex = /,(?!$)([^,]*),(?!$)([^,]*)?,(?!$)([^,]*)?,/i;
    var m = o.path.match(regex);
    return {
        id: o._id,
        title: o.label,
        duration: o.custom.duration,
        price: o.custom.price,
        ispromoted: o.custom.ispromoted,
        promotionprice: o.custom.promotionprice,
        promotionexpireson: o.custom.promotionexpireson,
        isfeatured: o.custom.isfeatured,
        description: o.description,
        features: o.custom.features ? o.custom.features : [],
        active: o.active,
        order: o.order,
        usercontext: m[2],
        usertype: m[3]
    };
};
//# sourceMappingURL=transforms.js.map