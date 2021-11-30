"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var dropdown_1 = require("../../main/dropdown");
var checkboxlist_1 = require("../../main/checkboxlist");
var selectbox_1 = require("../../main/selectbox");
var customasynctypeahead_1 = require("../../main/customasynctypeahead");
var textarea_1 = require("../../main/textarea");
var transforms_1 = require("../../../helpers/transforms");
var step1 = function (user, InputChange, DropDownChange, props) {
    return (React.createElement("div", { className: "form-bottom" },
        React.createElement("div", { className: "form-group row" },
            React.createElement("label", { className: "col-2 col-form-label" }, "Email"),
            React.createElement("div", { className: "col-10" },
                React.createElement("p", { className: "form-control-static", "data-name": "email" }, user.email))),
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
                React.createElement("div", { className: "error", id: "contact.phoneError" })),
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "selectAge", id: "ageRangeLabel" }, "Age"),
                React.createElement(dropdown_1.Dropdown, { id: "selectAge", name: "ageRange", labelField: "label", valueField: "value", value: user.ageRange, inputRef: props.ageRef, defaultOption: "Select age range", getResource: function () { return props.getResource('data.age'); }, onChange: DropDownChange, required: true }),
                React.createElement("div", { className: "error", id: "ageRangeError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-12" },
                React.createElement("label", { htmlFor: "inputAddress1", id: "mailingAddress.address1Label" },
                    "Street Address 1",
                    React.createElement("span", { className: 'small text-muted' }, " (will not be shared with public) ")),
                React.createElement("input", { type: "text", className: "form-control", id: "inputAddress1", placeholder: "Street address, P O box, company name", defaultValue: user.mailingAddress.address1, ref: "mailingAddress.address1", name: "mailingAddress.address1", onChange: InputChange, required: true }),
                React.createElement("div", { className: "error", id: "mailingAddress.address1Error" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-12" },
                React.createElement("label", { htmlFor: "inputAddress2", id: "mailingAddress.address2Label" },
                    "Street Address 2",
                    React.createElement("span", { className: 'small text-muted' }, " (will not be shared with public) ")),
                React.createElement("input", { type: "text", className: "form-control", id: "inputAddress2", placeholder: "Apartment, suite, unit, building, floor, etc.", ref: "mailingAddress.address2", name: "mailingAddress.address2", onChange: InputChange }),
                React.createElement("div", { className: "error", id: "mailingAddress.address2Error" }))),
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
var step2 = function (user, InputChange, DropDownChange, props) {
    return (React.createElement("div", { className: "form-bottom" },
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "selectJobsWithinMiles", id: "jobsWithinMilesLabel" }, "Jobs within"),
                React.createElement(dropdown_1.Dropdown, { id: "selectJobsWithinMiles", name: "jobsWithinMiles", labelField: "label", valueField: "value", value: user.jobsWithinMiles, inputRef: props.mileRef, defaultOption: "Select mile radius", getResource: function () { return props.getResource('data.miles'); }, onChange: DropDownChange, required: true }),
                React.createElement("div", { className: "error", id: "jobsWithinMilesError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputGroupEmploymentTypes", id: "employmentTypesLabel" }, "Employment Type"),
                React.createElement(checkboxlist_1.CheckboxList, { id: "inputGroupEmploymentTypes", name: "employmentTypes", labelField: "label", valueField: "value", values: user.employmentTypes, inputRef: props.employmentTypesRef, getResource: function () { return props.getResource('data.employmenttypes'); }, onChange: DropDownChange, required: true }),
                React.createElement("div", { className: "error", id: "employmentTypesError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputGroupAvailableTimes", id: "availableTimesLabel" }, "Availability"),
                React.createElement(checkboxlist_1.CheckboxList, { id: "inputGroupAvailableTimes", name: "availableTimes", labelField: "label", valueField: "value", checkAllValue: "Anytime", values: user.availableTimes, inputRef: props.availableTimesRef, getResource: function () { return props.getResource('data.availabletimes'); }, onChange: DropDownChange, required: true }),
                React.createElement("div", { className: "error", id: "availableTimesError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputGroupJobTypes", id: "jobTypesLabel" }, "Job Interested In"),
                React.createElement(selectbox_1.SelectBox, { id: "inputGroupJobTypes", name: "jobTypes", labelField: "label", valueField: "value", defaultOption: "All Jobs", values: user.jobTypes, inputRef: props.jobTypesRef, getResource: function () {
                        return props.getResource('settings.jobtypes', {
                            transformResponse: [transforms_1.transformSettings]
                        });
                    }, onChange: DropDownChange }),
                React.createElement("div", { className: "error", id: "jobTypesError" })))));
};
var step3 = function (user, handleInputChange, DropDownChange, props) {
    return (React.createElement("div", { className: "form-bottom" },
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "selectWorkExperience", id: "workExperienceLabel" }, "Work/Business Experience"),
                React.createElement(dropdown_1.Dropdown, { id: "selectWorkExperience", name: "workExperience", labelField: "label", valueField: "value", key: "workExperience", value: user.workExperience, inputRef: props.workExperienceRef, defaultOption: "Select number of years", getResource: function () { return props.getResource('data.workexperience'); }, onChange: DropDownChange, required: true }),
                React.createElement("div", { className: "error", id: "workExperienceError" })),
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "selectEducationLevel", id: "educationLevelLabel" }, "Education Level"),
                React.createElement(dropdown_1.Dropdown, { id: "selectEducationLevel", name: "educationLevel", labelField: "label", valueField: "value", value: user.educationLevel, inputRef: props.edlRef, defaultOption: "Select Education Level", getResource: function () { return props.getResource('data.educationlevel'); }, onChange: DropDownChange, required: true }),
                React.createElement("div", { className: "error", id: "educationLevelError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "selectWorkAreas", id: "workAreasLabel" }, "Areas worked in"),
                React.createElement(customasynctypeahead_1.CustomAsyncTypeAhead, { id: "typeAheadWorkAreas", name: "workAreas", selected: user.workAreas, inputRef: props.workAreasRef, allowNew: true, multiple: true, minLength: 2, defaultOption: "Add Area", getResource: function () { return props.getResource('typeaheads.workareas'); }, onChange: DropDownChange, required: true }),
                React.createElement("div", { className: "error", id: "workAreasError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "selectSkills", id: "skillsLabel" }, "Skills"),
                React.createElement(customasynctypeahead_1.CustomAsyncTypeAhead, { id: "typeAheadSkills", name: "skills", selected: user.skills, inputRef: props.skillsRef, allowNew: true, multiple: true, minLength: 2, defaultOption: "Add Skill", getResource: function () { return props.getResource('typeaheads.skills'); }, onChange: DropDownChange }),
                React.createElement("div", { className: "error", id: "skillsError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "textDescription", id: "descriptionLabel" }, "Profile Description"),
                React.createElement(textarea_1.TextArea, { id: "textAreaDescription", name: "description", defaultMessage: "Type description upto 700 characters long.", value: user.description, inputRef: props.descriptionRef, onChange: handleInputChange, maxlength: 700, rows: 5, required: true }),
                React.createElement("div", { className: "error", id: "descriptionError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "selectCertifications", id: "certificationsLabel" }, "Certifications/ Licenses"),
                React.createElement(customasynctypeahead_1.CustomAsyncTypeAhead, { id: "typeAheadCertifications", name: "certifications", selected: user.certifications, inputRef: props.certificationsRef, allowNew: true, multiple: true, minLength: 2, defaultOption: "Add Certifications", getResource: function () { return props.getResource('typeaheads.certifications'); }, onChange: DropDownChange }),
                React.createElement("div", { className: "error", id: "certificationsError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "selectAwards", id: "awardsLabel" }, "Awards/ Achievements"),
                React.createElement(customasynctypeahead_1.CustomAsyncTypeAhead, { id: "typeAheadAwards", name: "awards", selected: user.awards, inputRef: props.awardsRef, allowNew: true, multiple: true, minLength: 2, defaultOption: "Add Awards/ Achievements", getResource: function () { return props.getResource('typeaheads.awards'); }, onChange: DropDownChange }),
                React.createElement("div", { className: "error", id: "awardsError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "selectKeywords", id: "keywordsLabel" },
                    "Keywords for job interests",
                    React.createElement("span", { className: 'small text-muted' }, " (e.g. store; restaurant)")),
                React.createElement(customasynctypeahead_1.CustomAsyncTypeAhead, { id: "typeAheadkeywords", name: "keywords", selected: user.keywords, inputRef: props.keywordsRef, allowNew: true, multiple: true, minLength: 2, defaultOption: "Add Keywords", getResource: function () { return props.getResource('typeaheads.keywords'); }, onChange: DropDownChange, required: true }),
                React.createElement("div", { className: "error", id: "keywordsError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: 'col-sm' },
                React.createElement("div", { className: "custom-control custom-checkbox" },
                    React.createElement("input", { type: "checkbox", className: "custom-control-input", id: "checkReferences", name: "hasReferences", ref: "hasReferences", onChange: handleInputChange, defaultChecked: user.hasReferences }),
                    React.createElement("label", { htmlFor: "checkReferences", className: "custom-control-label", id: "hasReferencesLabel" }, "References available on request"))))));
};
exports.userdefs = function (props) {
    return [
        { state: 1, title: 'Who am I?', iconClass: 'fa fa-id-card',
            render: step1.bind(_this),
            props: props
        },
        { state: 2, title: 'What am I looking for?', iconClass: 'fa fa-bullseye', render: step2.bind(_this), props: props },
        { state: 3, title: 'Why hire me?', iconClass: 'fa fa-bullhorn', render: step3.bind(_this), props: props }
    ];
};
//# sourceMappingURL=employeeusersteps.js.map