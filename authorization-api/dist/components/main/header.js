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
var react_1 = require("react");
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header(props) {
        var _this = _super.call(this, props) || this;
        // set initial state
        _this.state = Object.assign({}, { collapseshow: false });
        return _this;
    }
    Header.prototype.render = function () {
        var _this = this;
        var client = this.context.client;
        var collapseshow = this.state.collapseshow;
        var navlinks = [
            { title: 'Home', url: '', icon: 'home' },
            { title: 'About Us', url: '/info/about us', icon: 'info-circle' },
            { title: 'How it Works?', url: '/info/how it works', icon: 'cogs' },
            { title: 'FAQs', url: '/info/faqs', icon: 'question' }
        ];
        var renderlink = function (link, i) {
            //            console.log(link);
            return (React.createElement("a", { key: i, href: client ? client.baseuri + link.url : '#', className: "nav-link" }, link.title));
        };
        return (React.createElement("nav", { className: "navbar navbar-expand-md bg-light fixed-top" },
            React.createElement("a", { href: client ? client.baseuri : '#', className: "navbar-brand" },
                React.createElement("img", { src: "/assets/images/logo.png", className: "img-fluid" })),
            React.createElement("button", { className: "navbar-toggler", type: "button", "data-toggle": "collapse", "data-target": "#navbarCollapse", "aria-controls": "navbarCollapse", "aria-expanded": "false", onClick: function (e) { _this.setState({ collapseshow: !collapseshow }); }, "aria-label": "Toggle navigation" },
                React.createElement("span", { className: "navbar-toggler-icon" })),
            React.createElement("div", { className: 'collapse navbar-collapse ' + (collapseshow ? 'show' : ''), id: "navbarCollapse" },
                React.createElement("nav", { className: "ml-auto navbar-nav" }, navlinks.map(renderlink)))));
    };
    Header.contextTypes = {
        client: react_1.PropTypes.object
    };
    return Header;
}(React.Component));
exports.Header = Header;
//# sourceMappingURL=header.js.map