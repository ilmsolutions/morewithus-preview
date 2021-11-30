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
var react_data_export_1 = require("react-data-export");
var ExcelFile = react_data_export_1.default.ExcelFile;
var ExcelSheet = react_data_export_1.default.ExcelFile.ExcelSheet;
var ExcelColumn = react_data_export_1.default.ExcelFile.ExcelColumn;
var RenderExcel = /** @class */ (function (_super) {
    __extends(RenderExcel, _super);
    function RenderExcel(props) {
        return _super.call(this, props) || this;
    }
    RenderExcel.prototype.render = function () {
        var _a = this.props, data = _a.data, coldefs = _a.coldefs, sheetname = _a.sheetname, filename = _a.filename;
        var download = React.createElement("span", { className: "fa fa-file-excel-o" });
        return (React.createElement(ExcelFile, { filename: filename, element: download },
            React.createElement(ExcelSheet, { data: data, name: sheetname }, coldefs.map(function (def, i) {
                return React.createElement(ExcelColumn, { key: i, label: def['label'], value: typeof (def['value']) === 'function' ?
                        function (r) { return def['value'](r, def['key']); }
                        : def['value'] });
            }))));
    };
    return RenderExcel;
}(React.Component));
exports.RenderExcel = RenderExcel;
//# sourceMappingURL=renderexcel.js.map