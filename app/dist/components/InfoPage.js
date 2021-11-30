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
var basecomponent_1 = require("./commons/basecomponent");
var InfoPage = /** @class */ (function (_super) {
    __extends(InfoPage, _super);
    function InfoPage(props) {
        var _this = _super.call(this, props) || this;
        _this.state = Object.assign({}, { pages: [] }, props.params);
        _this._bind('loadList');
        return _this;
    }
    InfoPage.prototype.componentDidMount = function () {
        var type = this.state.type;
        this.loadList(type);
    };
    InfoPage.prototype.componentWillReceiveProps = function (nextProps) {
        var type = this.state.type;
        if (nextProps && nextProps.params && nextProps.params.type != type)
            this.loadList(nextProps.params.type);
    };
    InfoPage.prototype.render = function () {
        var _a = this.state, type = _a.type, pages = _a.pages;
        var renderPage = function (page, i) {
            return React.createElement("div", { className: "container mt-5", key: i, dangerouslySetInnerHTML: { __html: page.body } });
        };
        return (React.createElement("div", { className: "container main-page" }, pages.map(renderPage)));
    };
    InfoPage.prototype.loadList = function (type) {
        var _this = this;
        if (type) {
            this.getResource('settings.pages' + (type ? ',' + type : '')).then(function (res) {
                //console.log(res);
                var pages = JSON.parse(res.data.toString());
                _this.setState({
                    type: type,
                    pages: pages.map(function (page) {
                        return {
                            title: page.custom['title'],
                            body: page.custom['body']
                        };
                    })
                });
                window.scrollTo(0, 0);
            });
        }
    };
    return InfoPage;
}(basecomponent_1.BaseComponent));
exports.InfoPage = InfoPage;
//# sourceMappingURL=infopage.js.map