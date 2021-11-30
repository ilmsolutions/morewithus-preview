"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = require("react");
var scriptcache_1 = require("../../helpers/scriptcache");
exports.ScriptLoadWrapper = function (scripts, Wrapped) { return /** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1(props) {
        var _this = _super.call(this, props) || this;
        _this.onLoad = _this.onLoad.bind(_this);
        return _this;
    }
    class_1.prototype.componentWillMount = function () {
        var scriptcache = scriptcache_1.ScriptCache.bind(Wrapped)();
        this.cache = scriptcache(scripts);
        //console.log('component will mount');
        //console.log(scriptcache);
        //console.log(this.cache);
    };
    class_1.prototype.onLoad = function (cb, reject) {
        //  console.log('on load');
        //  console.log(this.cache);
        var cache = this.cache;
        Object.keys(scripts).forEach(function (key) {
            cache[key].onLoad(cb, reject);
        });
    };
    class_1.prototype.render = function () {
        return React.createElement(Wrapped, __assign({}, this.props, { onLoad: this.onLoad }));
    };
    return class_1;
}(React.Component)); };
//# sourceMappingURL=scriptloadwrapper.js.map