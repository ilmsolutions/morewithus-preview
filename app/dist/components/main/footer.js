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
var react_router_1 = require("react-router");
var library_1 = require("../../helpers/library");
var contactus_1 = require("../home/contactus");
var Footer = /** @class */ (function (_super) {
    __extends(Footer, _super);
    function Footer(props) {
        return _super.call(this, props) || this;
    }
    Footer.prototype.render = function () {
        var _a = this.props, banner = _a.banner, socials = _a.socials;
        var navlinks = [
            { title: 'About Us', url: '/info/about us', icon: 'info-circle', showicon: false, showtext: true },
            { title: 'How it Works?', url: '/info/how it works', icon: 'cogs', showicon: false, showtext: true },
            { title: 'FAQs', url: '/info/faqs', icon: 'question', showicon: false, showtext: true },
            { title: 'Blog', url: 'https://everydayjobspro.com', icon: '', showicon: false, showtext: true, external: true },
            { title: 'Other Services', url: '/info/other services', icon: 'ellipsis-h', showicon: false, showtext: true }
        ];
        var sociallinks = [
            { title: 'Facebook', url: socials && socials['facebook'] ? socials['facebook'] : '#', icon: 'fa-facebook', showicon: true, showtext: false, external: true },
            { title: 'Google', url: socials && socials['google'] ? socials['google'] : '#', icon: 'fa-google-plus', showicon: true, showtext: false, external: true },
            { title: 'Linkedin', url: socials && socials['linkedin'] ? socials['linkedin'] : '#', icon: 'fa-linkedin', showicon: true, showtext: false, external: true },
            { title: 'Twitter', url: socials && socials['twitter'] ? socials['twitter'] : '#', icon: 'fa-twitter', showicon: true, showtext: false, external: true }
        ];
        var footerlinks = [
            { title: 'Terms & Conditions', url: '/info/terms', icon: null, showicon: false, showtext: true },
            { title: 'Privacy Policy', url: '/info/privacy policy', icon: null, showicon: false, showtext: true }
        ];
        var renderlink = function (link, i) {
            var nlink = link.external ? React.createElement("a", { href: link.url, className: "nav-link" }) :
                React.createElement(react_router_1.Link, { to: link.url, className: "nav-link", activeClassName: "active" });
            var lcontent = [];
            if (link.showicon)
                lcontent.push(React.createElement("i", { key: 'icon-' + i, className: 'fa ' + link.icon }));
            if (link.showtext)
                lcontent.push(React.createElement("span", { key: 'text-' + i }, link.title));
            return (React.createElement("li", { key: i }, link.external ? React.createElement("a", { href: link.url, className: 'nav-link' }, lcontent) :
                React.createElement(react_router_1.Link, { to: link.url, className: "nav-link", activeClassName: "active" }, lcontent)));
        };
        return (React.createElement("footer", { className: 'footer container-fluid bg-dark' },
            React.createElement("div", { className: 'row text-white' },
                banner && banner['title'] ?
                    React.createElement("div", { className: 'col-12 col-md-4' },
                        React.createElement("span", { className: "navbar-brand" }, library_1.Library.MSG_APP_TITLE),
                        React.createElement("small", null,
                            React.createElement("div", { className: 'font-weight-light', dangerouslySetInnerHTML: { __html: banner['body'] } }),
                            React.createElement("ul", { className: 'inline mb-0' }, sociallinks.map(renderlink)),
                            React.createElement("ul", { className: 'inline' }, footerlinks.map(renderlink)))) :
                    React.createElement("div", { className: 'col-12 col-md-4' },
                        React.createElement("small", null,
                            React.createElement("ul", { className: 'inline font-weight-light' }, footerlinks.map(renderlink)))),
                React.createElement("div", { className: 'col-12 col-md-3' },
                    React.createElement("h6", null, "Quick Links"),
                    React.createElement("ul", { className: 'font-weight-light' }, navlinks.map(renderlink))),
                React.createElement("div", { className: 'col-12 col-md-5' },
                    React.createElement("h6", null, "Contact Us"),
                    React.createElement(contactus_1.ContactUs, { size: 'sm' })))));
    };
    return Footer;
}(React.Component));
exports.Footer = Footer;
//# sourceMappingURL=footer.js.map