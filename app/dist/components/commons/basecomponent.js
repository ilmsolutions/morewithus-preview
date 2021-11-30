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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var axios_1 = require("axios");
var BaseComponent = /** @class */ (function (_super) {
    __extends(BaseComponent, _super);
    function BaseComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseComponent.prototype._bind = function () {
        var _this = this;
        var methods = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            methods[_i] = arguments[_i];
        }
        methods.forEach(function (method) { return _this[method] = _this[method].bind(_this); });
    };
    BaseComponent.prototype.getResource = function (resource, config) {
        config = config || {};
        var resourceurl = '';
        //console.log(resource);
        switch (true) {
            case /data\.[\w.]+$/.test(resource):
                resourceurl = '/api/data/json/' + resource.substring(resource.indexOf('data.') + 5);
                break;
            case /settings\.[\w\s,]+$/.test(resource):
                resourceurl = '/api/external/authorization/' + resource;
                break;
        }
        //console.log(resourceurl);
        return axios_1.default.get(resourceurl, config);
    };
    BaseComponent.prototype.postResource = function (resource, data) {
        var resourceurl = '';
        switch (true) {
            case /notifications\.[\w\s,]+$/.test(resource):
                resourceurl = '/api/external/authorization/' + resource;
                break;
        }
        return axios_1.default.post(resourceurl, data);
    };
    return BaseComponent;
}(React.Component));
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=basecomponent.js.map