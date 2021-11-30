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
var authbasecomponent_1 = require("../commons/authbasecomponent");
var configurationlist_1 = require("./configurationlist");
var configurationselect_1 = require("./configurationselect");
var report_1 = require("./report");
var Panel = /** @class */ (function (_super) {
    __extends(Panel, _super);
    function Panel(props) {
        var _this = _super.call(this, props) || this;
        _this.state = Object.assign({}, _this.getInitialState(), props);
        return _this;
    }
    Panel.prototype.componentWillMount = function () {
    };
    Panel.prototype.componentDidMount = function () {
    };
    Panel.prototype.getInitialState = function () {
        return {
            status: true,
            message: ''
        };
    };
    Panel.prototype.render = function () {
        var type = this.state.type;
        var Control = this.getControl(type);
        var typePref = Control === report_1.Report ? 'report.' : 'configuration.';
        return React.createElement(Control, { getResource: this.getResource, postResource: this.postResource, deleteResource: this.deleteResource, type: typePref + type });
    };
    Panel.prototype.getControl = function (type) {
        switch (true) {
            case /emailnotifications/.test(type):
            case /rules/.test(type):
            case /pages/.test(type):
                return configurationselect_1.ConfigurationSelect;
            case /users/.test(type):
                return report_1.Report;
            default:
                return configurationlist_1.ConfigurationList;
        }
    };
    return Panel;
}(authbasecomponent_1.AuthBaseComponent));
exports.Panel = Panel;
//# sourceMappingURL=panel.js.map