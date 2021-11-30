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
var apiservice_1 = require("./apiservice");
var statics = /** @class */ (function () {
    function statics() {
        var _this = this;
        this._statics = this.init();
        setInterval(function () {
            //refresh every 10 minutes
            //console.log('being called');
            _this._statics = _this.init();
        }, 1000 * 60 * 10);
    }
    statics.Instance = function () {
        if (!this.instance) {
            this.instance = new statics();
        }
        return this.instance;
    };
    statics.prototype.init = function () {
        var _statics = new Map();
        apiservice_1.getApiResource('authorization', 'settings.Pages,Home Banner', null, function (err, res) {
            if (!err && res) {
                var response = JSON.parse(res);
                _statics.set('banner', {
                    body: response[0]['custom'].body,
                    title: response[0]['custom'].title
                });
            }
        });
        apiservice_1.getApiResource('authorization', 'settings.SocialLogins', null, function (err, res) {
            if (!err && res) {
                var response = JSON.parse(res);
                //console.log(response);
                _statics.set('socials', response[0]['custom']);
            }
        });
        apiservice_1.getApiResource('authorization', 'settings.Pages', 'metaonly=true', function (err, res) {
            if (!err && res) {
                var response = JSON.parse(res);
                var metatags = response.map(function (item) {
                    return __assign({ type: item.path.match(/,pages,(.*?),/i)[1] }, item.custom);
                });
                _statics.set('metatags', metatags);
            }
        });
        return _statics;
    };
    statics.prototype.get = function (key) {
        return this._statics.get(key);
    };
    statics.prototype.set = function (key, value) {
        return this._statics.set(key, value);
    };
    return statics;
}());
exports.Statics = statics.Instance();
//# sourceMappingURL=statics.js.map