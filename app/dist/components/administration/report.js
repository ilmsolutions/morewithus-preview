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
var datagrid_1 = require("../main/datagrid");
var common_1 = require("../../helpers/common");
var promised_1 = require("../commons/promised");
var modal_1 = require("../main/modal");
var renderexcel_1 = require("../main/renderexcel");
var UserView = require("./userview");
var PromiseModal = promised_1.Promised('getResource', modal_1.Modal);
var Report = /** @class */ (function (_super) {
    __extends(Report, _super);
    function Report(props) {
        var _this = _super.call(this, props) || this;
        _this.state = Object.assign({}, _this.getInitialState(), props);
        _this._bind('loadList', 'getColumnDefs', 'updateHandler', 'deleteHandler', 'errorHandler', 'viewHandler', 'resetModal');
        return _this;
    }
    Report.prototype.getInitialState = function () {
        return {
            status: true,
            message: '',
            id: null,
            rows: []
        };
    };
    Report.prototype.componentDidMount = function () {
        this.loadList();
    };
    Report.prototype.render = function () {
        var type = this.props.type;
        var _a = this.state, rows = _a.rows, id = _a.id;
        var columnDefs = this.getColumnDefs(type);
        var ecolDefs = columnDefs.filter(function (def) {
            return def.key != 'actions';
        }).map(function (def) {
            return { label: def.name,
                value: def.cell != null && def.key != 'usertype' ? def.cell : def.key,
                key: def.key };
        });
        return (React.createElement("div", { className: 'container' },
            id ?
                React.createElement(PromiseModal, { getResource: this.getResource('report.users/' + id)
                        .then(function (value) {
                        //console.log(value);
                        return Promise.resolve({ content: JSON.parse(value.data.toString()) });
                    }), show: true, close: this.resetModal, renderer: UserView.default }) : '',
            React.createElement("span", { className: 'd-flex flex-row-reverse mt-2 pr-3' },
                React.createElement(renderexcel_1.RenderExcel, { data: rows, coldefs: ecolDefs, filename: 'UserList' + ' '
                        + new Date().toDisplay().replace('/', '_')
                        + '.xlsx', sheetname: 'Users' })),
            React.createElement(datagrid_1.DataGrid, { columndefs: columnDefs, type: type, rows: rows })));
    };
    Report.prototype.loadList = function () {
        var _this = this;
        var _a = this.props, type = _a.type, getResource = _a.getResource;
        getResource(type).then(function (res) {
            var co = JSON.parse(res.data.toString());
            //console.log(co);
            _this.setState({
                rows: co.users
            });
        });
    };
    Report.prototype.saveListItem = function (row) {
        var rows = this.state.rows;
        var _a = this.props, type = _a.type, postResource = _a.postResource;
        var self = this;
        postResource(type, row).then(function (res) {
            var co = JSON.parse(res.data.toString());
            var i = common_1.functions.findWithAttr(rows, '_id', row._id);
            rows[i] = co;
            self.setState({
                rows: rows
            });
        });
    };
    Report.prototype.deleteListItem = function (row) {
        var _this = this;
        var rows = this.state.rows;
        var _a = this.props, type = _a.type, deleteResource = _a.deleteResource;
        var self = this;
        deleteResource(type, { id: row._id }).then(function (res) {
            var i = common_1.functions.findWithAttr(rows, '_id', row._id);
            rows.splice(i, 1);
            self.setState({
                rows: rows,
                _id: row._id,
                status: true,
                message: 'Deleted!'
            });
        }).catch(function (err) { return _this.errorHandler(row._id, 'Delete failed!'); });
    };
    Report.prototype.errorHandler = function (_id, message) {
        this.setState({
            _id: _id,
            status: false,
            message: message
        });
    };
    Report.prototype.getColumnDefs = function (type) {
        var _this = this;
        switch (true) {
            case /users/.test(type):
                var ractions = function (item, key) {
                    return renderactions({
                        update: _this.updateHandler,
                        delete: _this.deleteHandler,
                        view: _this.viewHandler
                    }, item, key);
                };
                return [
                    { key: 'firstname', name: 'First Name', cell: null },
                    { key: 'lastname', name: 'Last Name', cell: null },
                    { key: 'email', name: 'Email', cell: null },
                    { key: 'usertype', name: 'User Type', cell: renderusertype },
                    { key: 'registered', name: 'Registered?', cell: renderboolean },
                    { key: 'lastlogin', name: 'Last Login', cell: renderdate, sort: sortdate },
                    { key: 'createdon', name: 'Created On', cell: renderdate, sort: sortdate },
                    { key: 'actions', name: 'Actions', cell: ractions }
                ];
        }
    };
    Report.prototype.updateHandler = function (item, fieldname, value) {
        item[fieldname] = value;
        this.saveListItem(item);
        return false;
    };
    Report.prototype.deleteHandler = function (item) {
        //this.deleteListItem(item);
        var _this = this;
        window.sweetalert({
            title: 'Are you sure you want to delete the user?',
            text: '',
            icon: 'warning',
            confirmButtonText: "Yes",
            showCancelButton: true,
            dangerMode: true
        }, function (willDelete) {
            if (willDelete) {
                _this.deleteListItem(item);
                //console.log('file deleted');
            }
            else
                console.log('not deleted');
        });
        return false;
    };
    Report.prototype.viewHandler = function (item) {
        this.setState({
            id: item._id
        });
        return false;
    };
    Report.prototype.resetModal = function () {
        this.setState({
            id: null
        });
    };
    return Report;
}(authbasecomponent_1.AuthBaseComponent));
exports.Report = Report;
function renderdate(item, key) {
    return new Date(item[key]).toDisplay();
}
function renderusertype(item, key) {
    if (item[key] === 'Organization') {
        return [React.createElement("i", { className: 'fa fa-users' }), ' ',
            item['organizationname'] ? item['organizationname'] : item[key]];
    }
    return item[key];
}
function sortdate(a, b, desc) {
    // force null and undefined to the bottom
    a = (a === null || a === undefined) ? -Infinity : new Date(a);
    b = (b === null || b === undefined) ? -Infinity : new Date(b);
    // Return either 1 or -1 to indicate a sort priority
    if (a > b) {
        return 1;
    }
    if (a < b) {
        return -1;
    }
    // returning 0 or undefined will use any subsequent column sorting methods or the row index as a tiebreaker
    return 0;
}
function renderboolean(item, key) {
    var arr = [];
    if (item['isregisteredemployee'] == true)
        arr.push('Employee');
    if (item['isregisteredemployer'] == true)
        arr.push('Employer');
    return arr.join(' ');
}
var actions = [
    { field: 'update', behaviors: function (item, clickHandler) {
            return {
                onclick: function (e) {
                    e.preventDefault();
                    clickHandler(item, 'isblocked', !item['isblocked']);
                },
                icon: function () {
                    return (item['isblocked'] == true ? ' fa-ban text-danger' : ' fa-ban text-muted');
                },
                title: function () {
                    return 'Click to' + (item['isblocked'] == true ? ' unblock ' : ' block ') + 'user';
                }
            };
        }
    },
    {
        field: 'view', behaviors: function (item, clickHandler) {
            return {
                onclick: function (e) {
                    e.preventDefault();
                    clickHandler(item);
                },
                icon: 'fa-eye',
                title: 'View Details'
            };
        }
    },
    {
        field: 'delete', behaviors: function (item, clickHandler) {
            return {
                onclick: function (e) {
                    e.preventDefault();
                    clickHandler(item);
                },
                icon: 'fa-trash text-danger',
                title: 'Delete User'
            };
        }
    }
];
function renderactions(clickHandlers, item, key) {
    return actions.map(function (action, a) {
        var behaviors = action.behaviors(item, clickHandlers[action.field]);
        return React.createElement("a", { href: '#', key: a, title: typeof behaviors.title === 'function' ?
                behaviors.title() : behaviors.title, onClick: behaviors.onclick },
            React.createElement("i", { className: 'fa ' + (typeof behaviors.icon === 'function' ?
                    behaviors.icon() : behaviors.icon) }));
    });
}
//# sourceMappingURL=report.js.map