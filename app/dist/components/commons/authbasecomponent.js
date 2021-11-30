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
var axios_1 = require("axios");
var basecomponent_1 = require("./basecomponent");
var AuthBaseComponent = /** @class */ (function (_super) {
    __extends(AuthBaseComponent, _super);
    function AuthBaseComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AuthBaseComponent.prototype.getResource = function (resource, config) {
        config = config || {};
        var resourceurl = '';
        switch (true) {
            case /locals\.[\w.]+$/.test(resource):
                resourceurl = '/api/auth/locals/' + resource.substring(resource.indexOf('locals.') + 7);
                break;
            case /data\.[\w.]+$/.test(resource):
                resourceurl = '/api/data/json/' + resource.substring(resource.indexOf('data.') + 5);
                break;
            case /change/.test(resource):
                resourceurl = '/api/auth/externalwencryption/authorization/' + resource;
                break;
            case /typeaheads\.\w+$/.test(resource):
            case /configuration\.\w+$/.test(resource):
            case /report\.\w+$/.test(resource):
            case /settings\.\w+$/.test(resource):
            case /user/.test(resource):
                resourceurl = '/api/auth/external/authorization/' + resource;
                break;
        }
        //console.log(resourceurl);
        return axios_1.default.get(resourceurl, config);
    };
    AuthBaseComponent.prototype.postResource = function (resource, data) {
        var resourceurl = '';
        switch (true) {
            case /configuration\.\w+$/.test(resource):
            case /report\.\w+$/.test(resource):
                resourceurl = '/api/auth/external/admin/' + resource;
                break;
            case /upload\.\w+$/.test(resource):
                resourceurl = '/api/auth/upload/' + resource.substring(resource.indexOf('upload.') + 7);
                break;
        }
        return axios_1.default.post(resourceurl, data);
    };
    AuthBaseComponent.prototype.deleteResource = function (resource, data) {
        var resourceurl = '';
        switch (true) {
            case /configuration\.\w+$/.test(resource):
            case /report\.\w+$/.test(resource):
                resourceurl = '/api/auth/external/admin/' + resource;
                break;
        }
        return axios_1.default.delete(resourceurl, Object.assign({}, { params: data }));
    };
    return AuthBaseComponent;
}(basecomponent_1.BaseComponent));
exports.AuthBaseComponent = AuthBaseComponent;
//# sourceMappingURL=authbasecomponent.js.map