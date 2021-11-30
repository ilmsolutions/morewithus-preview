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
var ReactCSSTransitionGroup = require("react-addons-css-transition-group"); // ES6
var validatecomponent_1 = require("../commons/validatecomponent");
var configurationform_1 = require("./configurationform");
var configurationsubscription_1 = require("./configurationsubscription");
var configurationadverts_1 = require("./configurationadverts");
var configurationsocials_1 = require("./configurationsocials");
var common_1 = require("../../helpers/common");
var ConfigurationList = /** @class */ (function (_super) {
    __extends(ConfigurationList, _super);
    function ConfigurationList(props) {
        var _this = _super.call(this, props) || this;
        _this.state = Object.assign({}, _this.getInitialState(), props);
        _this._bind('loadList', 'renderForm', 'saveListItem', 'deleteListItem', 'addForm', 'errorHandler');
        return _this;
    }
    ConfigurationList.prototype.getInitialState = function () {
        return {
            status: true,
            message: '',
            rows: []
        };
    };
    ConfigurationList.prototype.componentDidMount = function () {
        this.loadList();
    };
    ConfigurationList.prototype.render = function () {
        var _this = this;
        var _a = this.state, type = _a.type, rows = _a.rows;
        var control = this.getControl(type);
        var renderforms = this.state.rows.map(function (row, i) { return _this.renderForm(control, row, i); });
        return React.createElement("div", { className: "container configuration-container" },
            React.createElement("span", { className: "d-flex justify-content-end" },
                React.createElement("button", { className: "btn btn-success", onClick: this.addForm },
                    React.createElement("i", { className: "fa fa-plus" }),
                    " Add")),
            React.createElement(ReactCSSTransitionGroup, { transitionName: "step", transitionEnterTimeout: 500, transitionLeaveTimeout: 300 }, renderforms));
    };
    ConfigurationList.prototype.renderForm = function (Control, row, i) {
        var _a = this.state, status = _a.status, message = _a.message, _id = _a._id;
        var props = (row._id == _id ? { status: status, message: message } : {});
        return React.createElement(Control, __assign({ key: row && row._id ? row._id : '', row: row, save: this.saveListItem, remove: this.deleteListItem }, props));
    };
    ConfigurationList.prototype.addForm = function (e) {
        this.setState(function (state) {
            var path = ',' +
                common_1.functions.toProperCase(state.type.replace(/configuration\./, '')) +
                ',';
            state.rows.splice(0, 0, {
                path: path
            });
        });
    };
    ConfigurationList.prototype.loadList = function () {
        var _this = this;
        var _a = this.props, type = _a.type, getResource = _a.getResource;
        getResource(type).then(function (res) {
            var co = JSON.parse(res.data.toString());
            _this.setState({
                rows: co.result
            });
        });
    };
    ConfigurationList.prototype.saveListItem = function (row) {
        var _this = this;
        var rows = this.state.rows;
        var _a = this.props, type = _a.type, postResource = _a.postResource;
        var self = this;
        var save = null;
        if (row.custom && row.custom.image && !common_1.functions.contains('url', row.custom.image)) {
            save = postResource('upload.image', row.custom).then(function (res) {
                if (res.data) {
                    row.custom = Object.assign({}, row.custom, res.data);
                    return postResource(type, row);
                }
            }).catch(function (err) { return _this.errorHandler(row._id, 'Upload failed!'); });
        }
        else
            save = postResource(type, row);
        save.then(function (res) {
            var co = JSON.parse(res.data.toString());
            var i = common_1.functions.findWithAttr(rows, '_id', row._id);
            rows[i] = co;
            console.log('save successful');
            self.setState({
                rows: rows,
                _id: row._id,
                status: true,
                message: 'Success!'
            });
        }).catch(function (err) { return _this.errorHandler(row._id, 'Save failed!'); });
    };
    ConfigurationList.prototype.deleteListItem = function (row) {
        var _this = this;
        var rows = this.state.rows;
        var _a = this.props, type = _a.type, deleteResource = _a.deleteResource;
        var self = this;
        deleteResource(type, row).then(function (res) {
            var i = common_1.functions.findWithAttr(rows, '_id', row.item);
            rows.splice(i, 1);
            self.setState({
                rows: rows,
                _id: row._id,
                status: true,
                message: 'Deleted!'
            });
        }).catch(function (err) { return _this.errorHandler(row._id, 'Delete failed!'); });
    };
    ConfigurationList.prototype.getControl = function (type) {
        switch (true) {
            case /adverts/.test(type):
                return configurationadverts_1.ConfigurationAdverts;
            case /subscriptions/.test(type):
                return configurationsubscription_1.ConfigurationSubscription;
            case /sociallogins/.test(type):
                return configurationsocials_1.ConfigurationSocials;
            case /jobtypes/.test(type):
            default:
                return configurationform_1.ConfigurationForm;
        }
    };
    ConfigurationList.prototype.errorHandler = function (_id, message) {
        this.setState({
            _id: _id,
            status: false,
            message: message
        });
    };
    return ConfigurationList;
}(validatecomponent_1.Validate));
exports.ConfigurationList = ConfigurationList;
//# sourceMappingURL=configurationlist.js.map