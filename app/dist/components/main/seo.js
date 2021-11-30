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
var react_helmet_1 = require("react-helmet");
var SEO = /** @class */ (function (_super) {
    __extends(SEO, _super);
    function SEO(props) {
        return _super.call(this, props) || this;
    }
    SEO.prototype.render = function () {
        var _a = this.props, metatags = _a.metatags, type = _a.type;
        var metatag = metatags && type ? metatags.filter(function (mt) {
            return type.toLowerCase() == mt['type'].toLowerCase();
        })[0] : (metatags ? metatags[0] : null);
        var rendermeta = function (meta) {
            if (meta != null) {
                return React.createElement(react_helmet_1.Helmet, null,
                    React.createElement("title", null, meta['title']),
                    React.createElement("meta", { name: "description", content: meta['description'] }),
                    React.createElement("meta", { name: "keywords", content: meta['keywords'] }));
            }
        };
        return (React.createElement("div", { className: 'meta' }, rendermeta(metatag)));
    };
    return SEO;
}(React.Component));
exports.SEO = SEO;
//# sourceMappingURL=seo.js.map