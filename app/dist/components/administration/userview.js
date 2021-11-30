"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("../../helpers/date");
var rb = (function (v, pos) {
    var cc = pos ? (v ? 'success' : 'danger') :
        (v ? 'danger' : 'success');
    return React.createElement("i", { className: 'fa fa-' + (v ? 'check' : 'times') + ' text-' + cc });
}), rd = (function (v) {
    return new Date(v).toDisplay();
}), rs = (function (v, pref) {
    pref = pref || '';
    return v ? v + ' ' + pref : '-';
}), rc = (function (v) {
    return v ? v.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }) : null;
}), ra = (function (v) {
    return v && v.length > 0 ? v.join(', ') : '-';
}), subscriptionDefs = [
    { key: 'orderid', name: 'Order ID' },
    { key: 'paymentid', name: 'Payment ID' },
    { key: 'paymentdate', name: 'Payment Date', cell: rd },
    { key: 'usercontext', name: 'Plan Type' },
    { key: 'planid', name: 'Plan' },
    { key: 'orderamount', name: 'Amount Paid', cell: rc },
    { key: 'isexpired', name: 'Active', cell: function (v) { return rb(!v, true); } }
], rr = (function (cols) {
    return (React.createElement("div", { className: 'row' }, cols.map(function (col, ci) {
        return (React.createElement("dl", { className: 'col', key: ci },
            React.createElement("dt", null, col.label),
            React.createElement("dd", null, col.value)));
    })));
}), rtr = function (r, cdefs, ri) {
    return (React.createElement("tr", { key: ri }, cdefs.map(function (cdef, ci) {
        return React.createElement("td", { key: ci }, cdef.cell ? cdef.cell(r[cdef.key]) : r[cdef.key]);
    })));
}, rt = function (rws, cdefs) {
    return (React.createElement("div", { className: 'table-responsive' },
        React.createElement("table", { className: "table table-sm" },
            React.createElement("thead", null,
                React.createElement("tr", { className: 'thead-dark' }, cdefs.map(function (cdef, ci) {
                    return React.createElement("th", { key: ci }, cdef.name);
                }))),
            React.createElement("tbody", null, rws.map(function (rw, ri) {
                return rtr(rw, cdefs, ri);
            })))));
};
var UserView = function (_a) {
    var content = _a.content;
    return (React.createElement("div", { className: 'container' },
        rr([{ label: 'First Name', value: content.firstname },
            { label: 'Last Name', value: content.lastname }]),
        rr([{ label: 'Email', value: content.email },
            { label: 'User Context', value: content.usercontext }]),
        rr([{ label: 'User Type', value: content.usertype },
            { label: 'Organization', value: content.organizationname }]),
        React.createElement("address", null, [React.createElement("strong", { key: 'strong' }, "Address"), React.createElement("br", { key: 'br-1' }),
            content.mailingAddress.address1, ', ', content.mailingAddress.city,
            React.createElement("br", { key: 'br-2' }), content.mailingAddress.state,
            ' ', content.mailingAddress.zipcode]),
        rr([{ label: 'Last Login', value: rd(content.lastlogin) },
            { label: 'Created On', value: rd(content.createdon) }]),
        rr([{ label: 'Active Employee?', value: rb(content.isactiveemployee, true) },
            { label: 'Active Employer?', value: rb(content.isactiveemployer, true) },
            { label: 'Blocked?', value: rb(content.isblocked, false) }]),
        rr([{ label: 'Registered Employer?', value: rb(content.isregisteredemployer, true) },
            { label: 'Registered Employee?', value: rb(content.isregisteredemployee, true) },
            { label: 'Has References?', value: rb(content.hasReferences, true) }]),
        rr([{ label: 'Jobs Within', value: rs(content.jobsWithinMiles, 'Miles') },
            { label: 'Work Experience', value: rs(content.workExperience, 'Years') }]),
        rr([{ label: 'Description', value: content.description }]),
        rr([{ label: 'Skills', value: ra(content.skills) }]),
        rr([{ label: 'Certifications', value: ra(content.certifications) }]),
        rr([{ label: 'Work Areas', value: ra(content.workAreas) }]),
        rr([{ label: 'Available Times', value: ra(content.availableTimes) }]),
        rr([{ label: 'Job Types', value: ra(content.jobTypes) }]),
        rr([{ label: 'Employment Types', value: ra(content.employmentTypes) }]),
        rt(content.subscriptions, subscriptionDefs)));
};
exports.default = UserView;
//# sourceMappingURL=userview.js.map