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
var basecomponent_1 = require("../commons/basecomponent");
var Advertisement = /** @class */ (function (_super) {
    __extends(Advertisement, _super);
    function Advertisement(props) {
        var _this = _super.call(this, props) || this;
        _this.state = Object.assign({}, { adverts: [] });
        return _this;
    }
    Advertisement.prototype.componentDidMount = function () {
        var _this = this;
        this.getResource('settings.adverts').then(function (res) {
            //console.log(res);
            var adverts = JSON.parse(res.data.toString());
            _this.setState({
                adverts: adverts.map(transformAdvertDTO)
            });
        });
    };
    Advertisement.prototype.render = function () {
        var adverts = this.state.adverts;
        var selIndex = Math.floor(Math.random() * adverts.length);
        var selAdvert = adverts[selIndex];
        var renderAdvert = selAdvert ? React.createElement("a", { href: selAdvert.url, target: '_blank', title: selAdvert.title },
            React.createElement("img", { className: 'img-fluid', src: selAdvert.fileurl, title: selAdvert.title }),
            " ") : React.createElement("span", null);
        return (React.createElement("div", { className: 'mt-2 text-center' }, renderAdvert));
    };
    return Advertisement;
}(basecomponent_1.BaseComponent));
exports.Advertisement = Advertisement;
function transformAdvertDTO(o) {
    return {
        id: o._id,
        title: o.label,
        description: o.description,
        filename: o.custom.file,
        fileurl: o.custom.image,
        url: o.custom.url
    };
}
//# sourceMappingURL=advertisement.js.map