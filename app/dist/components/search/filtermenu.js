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
var axios_1 = require("axios");
var update = require("immutability-helper");
var common_1 = require("../../helpers/common");
var transforms_1 = require("../../helpers/transforms");
var FilterMenu = /** @class */ (function (_super) {
    __extends(FilterMenu, _super);
    function FilterMenu(props) {
        var _this = _super.call(this, props) || this;
        _this.state = Object.assign({}, _this.getInitialState(), { filters: props.filters });
        _this.clickHandler = _this.clickHandler.bind(_this);
        _this.applyFilters = _this.applyFilters.bind(_this);
        _this.clearFilters = _this.clearFilters.bind(_this);
        return _this;
    }
    FilterMenu.prototype.getInitialState = function () {
        //console.log('in initial state');
        return {
            jobtypes: [],
            employmenttypes: [],
            availabletimes: [],
            educationlevels: []
        };
    };
    FilterMenu.prototype.componentDidMount = function () {
        var _this = this;
        var jobtypes = this.state.jobtypes;
        if (jobtypes != null && jobtypes.length > 0)
            return;
        var getFilterResource = this.getFilterResource;
        var getResource = this.getResource;
        axios_1.default.all([
            getResource('settings.jobtypes', {
                transformResponse: [transforms_1.transformSettings]
            }), getFilterResource('employmenttypes'),
            getFilterResource('availabletimes'), getFilterResource('educationlevel')
        ])
            .then(function (results) {
            var jobtypes = Array.prototype.slice.call(results[0].data).map(function (jobtype) {
                var value = jobtype.children.map(function (opt) {
                    return opt.value;
                }).join(',');
                return Object.assign({}, jobtype, { value: value });
            });
            var availabletimes = Array.prototype.slice.call(results[2].data).filter(function (availabletime) {
                return availabletime.value != 'Anytime';
            });
            var educationlevels = Array.prototype.slice.call(results[3].data).filter(function (educationlevel) {
                return educationlevel.value != 'None of the above';
            });
            _this.setState({
                jobtypes: jobtypes,
                employmenttypes: results[1].data,
                availabletimes: availabletimes,
                educationlevels: educationlevels
            });
        });
    };
    FilterMenu.prototype.render = function () {
        var _a = this.state, jobtypes = _a.jobtypes, employmenttypes = _a.employmenttypes, availabletimes = _a.availabletimes, educationlevels = _a.educationlevels, filters = _a.filters;
        var _b = this.props, cardclass = _b.cardclass, show = _b.show;
        var clickHandler = this.clickHandler;
        var checkboxHandler = function (key, d, i) {
            var id = key + '-' + i;
            return React.createElement("div", { className: "custom-control custom-checkbox", key: i },
                React.createElement("input", { type: "checkbox", className: "custom-control-input", onClick: clickHandler, value: d.value, id: id, 
                    //defaultChecked={filters[key] && filters[key].indexOf(d.value) >= 0}
                    checked: filters[key] != null && filters[key].indexOf(d.value) >= 0 }),
                React.createElement("label", { className: "custom-control-label", htmlFor: id },
                    "\u00A0\u00A0",
                    d.label));
        };
        var carddefs = [
            { label: 'Job Types', key: 'jobTypes', render: checkboxHandler.bind(null, 'jobTypes') },
            { label: 'Employment Types', key: 'employmentTypes', render: checkboxHandler.bind(null, 'employmentTypes') },
            { label: 'Available Times', key: 'availableTimes', render: checkboxHandler.bind(null, 'availableTimes') },
            { label: 'Education Level', key: 'educationLevel', render: checkboxHandler.bind(null, 'educationLevel') }
        ];
        var carddata = [
            jobtypes, employmenttypes, availabletimes, educationlevels
        ];
        var cards = carddefs.map(function (card, i) {
            return React.createElement("div", { className: "card " + cardclass, key: i, "data-key": card.key },
                React.createElement("div", { className: "card-body" },
                    React.createElement("h6", { className: "card-title" }, card.label),
                    React.createElement("div", { className: "card-text" }, carddata[i].map(card.render))));
        });
        return React.createElement("div", { className: "col card-columns filter-cards border-top-1 " +
                (show ? 'd-block' : 'd-none') },
            cards,
            React.createElement("div", { className: "card " + cardclass },
                React.createElement("div", { className: "card-body" },
                    React.createElement("button", { className: "btn btn-success mr-2", onClick: this.applyFilters }, "Apply Filters"),
                    React.createElement("button", { className: "btn btn-default", onClick: this.clearFilters }, "Clear Filters"))));
    };
    FilterMenu.prototype.clickHandler = function (e) {
        var i = e.target, c = common_1.functions.findAncestor(i, 'card'), k = c.dataset.key, is = c.querySelectorAll('input[type=checkbox]:checked'), v = '';
        if (is != null) {
            v = Array.prototype.slice.call(is).map(function (i) {
                return i.value;
            }).join(',');
        }
        this.setState(function (state) {
            var _a;
            return update(state, { filters: (_a = {}, _a[c.dataset.key] = { $set: v }, _a) });
        });
    };
    FilterMenu.prototype.applyFilters = function (e) {
        var filters = this.state.filters;
        this.props.applyFilters(filters);
    };
    FilterMenu.prototype.clearFilters = function (e) {
        this.setState({ filters: {} });
        this.props.applyFilters({});
    };
    FilterMenu.prototype.getFilterResource = function (resource) {
        return axios_1.default.get('/api/data/json/' + resource);
    };
    FilterMenu.prototype.getResource = function (resource, config) {
        config = config || {};
        return axios_1.default.get('/api/external/authorization/' + resource, config);
    };
    return FilterMenu;
}(React.Component));
exports.FilterMenu = FilterMenu;
//# sourceMappingURL=filtermenu.js.map