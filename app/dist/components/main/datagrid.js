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
//import {ReactTable} from 'react-table';
require("react-table/react-table.css");
var ReactTable;
if (typeof window !== 'undefined')
    ReactTable = require('react-table').default;
var DataGrid = /** @class */ (function (_super) {
    __extends(DataGrid, _super);
    function DataGrid(props) {
        var _this = _super.call(this, props) || this;
        _this.state = Object.assign({}, _this.getInitialState(), props);
        return _this;
    }
    DataGrid.prototype.getInitialState = function () {
        return {
            rows: []
        };
    };
    DataGrid.prototype.componentDidMount = function () {
    };
    DataGrid.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.rows)
            this.setState({
                rows: nextProps.rows
            });
    };
    DataGrid.prototype.render = function () {
        var columndefs = this.props.columndefs;
        var tsettings = Object.assign({}, {
            getTdProps: function (state, rowInfo, column, instance) {
                //               console.log('td props');
                //               console.log(column);
                return {};
            }
        });
        var rows = this.state.rows;
        var mcolumndefs = columndefs.map(function (def) {
            return {
                Header: def.name,
                id: def.key,
                accessor: function (item) {
                    return def.cell ? def.cell(item, def.key) : item[def.key];
                },
                sortMethod: def.sort ? def.sort : null
            };
        });
        var renderGrid = ReactTable ? React.createElement(ReactTable, { key: 'table', columns: mcolumndefs, className: 'table', data: rows }) : ''; // : 'Loading....'
        return (React.createElement("div", { className: "my-2 container data-grid" }, renderGrid));
    };
    return DataGrid;
}(React.Component));
exports.DataGrid = DataGrid;
//# sourceMappingURL=datagrid.js.map