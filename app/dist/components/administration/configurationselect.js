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
var validatecomponent_1 = require("../commons/validatecomponent");
var configurationemailnotifications_1 = require("./configurationemailnotifications");
var configurationrules_1 = require("./configurationrules");
var configurationpages_1 = require("./configurationpages");
var common_1 = require("../../helpers/common");
var ConfigurationSelect = /** @class */ (function (_super) {
    __extends(ConfigurationSelect, _super);
    function ConfigurationSelect(props) {
        var _this = _super.call(this, props) || this;
        _this.state = Object.assign({}, _this.getInitialState(), props);
        _this._bind('loadList', 'saveListItem', 'onChange', 'errorHandler');
        return _this;
    }
    ConfigurationSelect.prototype.componentDidMount = function () {
        this.loadList();
    };
    ConfigurationSelect.prototype.getInitialState = function () {
        return {
            status: true,
            message: '',
            selindex: 0,
            rows: null
        };
    };
    ConfigurationSelect.prototype.render = function () {
        var type = this.props.type;
        var _a = this.state, rows = _a.rows, _id = _a._id, status = _a.status, message = _a.message;
        var Control = this.getControl(type);
        _id = _id ? _id : (rows && rows.length > 0 ? rows[0]._id : null);
        var srow = rows ? rows.filter(function (row) {
            return row._id == _id;
        })[0] : null;
        var renderOption = function (row, i) {
            return React.createElement("option", { className: row._id == _id ? 'active' : '', value: row._id, key: i }, row.label);
        };
        var renderSelect = rows ? React.createElement("select", { className: "form-control", id: "notificationSelect", onChange: this.onChange }, rows.map(renderOption)) : 'Loading.....';
        var props = (rows && srow._id == _id ? { status: status, message: message } : {});
        var renderContent = rows ? React.createElement(Control, __assign({ row: srow, save: this.saveListItem }, props)) :
            'Loading....';
        return React.createElement("div", { className: "container configuration-container" },
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "notificationSelect" }, "Select: "),
                renderSelect),
            React.createElement("div", { className: "form-group", key: _id }, renderContent));
    };
    ConfigurationSelect.prototype.loadList = function () {
        var _this = this;
        var _a = this.props, type = _a.type, getResource = _a.getResource;
        getResource(type).then(function (res) {
            var co = JSON.parse(res.data.toString());
            _this.setState({
                rows: co.result,
                status: true,
                message: ''
            });
        }).catch(function (err) { return _this.errorHandler(null, 'Load failed!'); });
    };
    ConfigurationSelect.prototype.saveListItem = function (row) {
        var _this = this;
        var rows = this.state.rows;
        var _a = this.props, type = _a.type, postResource = _a.postResource;
        var self = this;
        postResource(type, row).then(function (res) {
            var co = JSON.parse(res.data.toString());
            var i = common_1.functions.findWithAttr(rows, '_id', row._id);
            rows[i] = co;
            self.setState({
                rows: rows,
                _id: row._id,
                status: true,
                message: 'Success!'
            });
        }).catch(function (err) { return _this.errorHandler(row._id, 'Save failed!'); });
    };
    ConfigurationSelect.prototype.onChange = function (e) {
        var rows = this.state.rows;
        var target = e.target, _id = target.value;
        this.setState({ _id: _id, message: '' });
    };
    ConfigurationSelect.prototype.getControl = function (type) {
        switch (true) {
            case /rules/.test(type):
                return configurationrules_1.ConfigurationRules;
            case /emailnotifications/.test(type):
                return configurationemailnotifications_1.ConfigurationEmailNotifications;
            case /pages/.test(type):
                return configurationpages_1.ConfigurationPages;
        }
    };
    ConfigurationSelect.prototype.errorHandler = function (_id, message) {
        this.setState({
            _id: _id,
            status: false,
            message: message
        });
    };
    return ConfigurationSelect;
}(validatecomponent_1.Validate));
exports.ConfigurationSelect = ConfigurationSelect;
//# sourceMappingURL=configurationselect.js.map