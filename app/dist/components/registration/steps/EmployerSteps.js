"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var dropdown_1 = require("../../main/dropdown");
var step1 = function (user, InputChange, DropDownChange, props) {
    return (React.createElement("div", { className: "form-bottom" },
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { className: "col-2 col-form-label" }, "Email"),
                React.createElement("div", { className: "col-10" },
                    React.createElement("p", { className: "form-control-static", "data-name": "email" }, user.email))),
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputOrganization", id: "organizationnameLabel" }, "Organization Name"),
                React.createElement("input", { type: "text", className: "form-control", id: "inputOrganization", placeholder: "Organization Name", defaultValue: user.organizationname, ref: "organizationname", name: "organizationname", onChange: InputChange }),
                React.createElement("div", { className: "error", id: "organizationnameError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputFirstName", id: "firstnameLabel" }, "First Name"),
                React.createElement("input", { type: "text", className: "form-control", id: "inputFirstName", placeholder: "First Name", defaultValue: user.firstname, ref: "firstname", name: "firstname", onChange: InputChange, required: true }),
                React.createElement("div", { className: "error", id: "firstnameError" })),
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputLastName", id: "lastnameLabel" }, "Last Name"),
                React.createElement("input", { type: "text", className: "form-control", id: "inputLastName", placeholder: "Last Name", defaultValue: user.lastname, ref: "lastname", name: "lastname", onChange: InputChange, required: true }),
                React.createElement("div", { className: "error", id: "lastnameError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputPhoneNumber", id: "contact.phoneLabel" }, "Phone Number"),
                React.createElement("input", { type: "tel", className: "form-control", id: "inputPhoneNumber", placeholder: "Phone Number", defaultValue: user.contact.phone, ref: "contact.phone", name: "contact.phone", onChange: InputChange, required: true, pattern: "[0-9]{3}[ |-][0-9]{3}[ |-][0-9]{4}" }),
                React.createElement("div", { className: "error", id: "contact.phoneError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-12" },
                React.createElement("label", { htmlFor: "inputAddress1", id: "mailingAddress.address1Label" },
                    "Street Address 1 ",
                    React.createElement("span", { className: 'small text-muted' }, " (will not be shared with public) ")),
                React.createElement("input", { type: "text", className: "form-control", id: "inputAddress1", placeholder: "Street address, P O box, company name", defaultValue: user.mailingAddress.address1, ref: "mailingAddress.address1", name: "mailingAddress.address1", onChange: InputChange, required: true }),
                React.createElement("div", { className: "error", id: "mailingAddress.address1Error" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-12" },
                React.createElement("label", { htmlFor: "inputAddress2", id: "mailingAddress.address2Label" },
                    "Street Address 2 ",
                    React.createElement("span", { className: 'small text-muted' }, " (will not be shared with public) ")),
                React.createElement("input", { type: "text", className: "form-control", id: "inputAddress2", placeholder: "Apartment, suite, unit, building, floor, etc.", ref: "mailingAddress.address2", name: "mailingAddress.address2", onChange: InputChange }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputCity", id: "mailingAddress.cityLabel" }, "City"),
                React.createElement("input", { type: "text", className: "form-control", id: "inputCity", placeholder: "City", defaultValue: user.mailingAddress.city, ref: "mailingAddress.city", name: "mailingAddress.city", onChange: InputChange, required: true }),
                React.createElement("div", { className: "error", id: "mailingAddress.cityError" })),
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "selectState", id: "mailingAddress.stateLabel" }, "State"),
                React.createElement(dropdown_1.Dropdown, { id: "selectState", name: "mailingAddress.state", value: user.mailingAddress.state, defaultOption: "Select State", inputRef: props.stateRef, labelField: "name", valueField: "abbreviation", onChange: DropDownChange, getResource: function () { return props.getResource('data.states.us'); }, required: true }),
                React.createElement("div", { className: "error", id: "mailingAddress.stateError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputZipCode", id: "mailingAddress.zipcodeLabel" }, "Zip Code"),
                React.createElement("input", { type: "text", className: "form-control", id: "inputZipCode", placeholder: "Zip Code", defaultValue: user.mailingAddress.zipcode, ref: "mailingAddress.zipcode", name: "mailingAddress.zipcode", onChange: InputChange, required: true }),
                React.createElement("div", { className: "error", id: "mailingAddress.zipcodeError" })))));
};
exports.employerdefs = function (props) {
    return [
        { state: 1, title: 'Who am I?', iconClass: 'fa fa-id-card',
            render: step1.bind(_this),
            props: props
        }
    ];
};
//# sourceMappingURL=employersteps.js.map