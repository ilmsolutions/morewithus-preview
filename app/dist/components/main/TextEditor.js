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
var RichTextEditor;
if (typeof (window) !== 'undefined') {
    RichTextEditor = require('react-rte').default;
}
var TextEditor = /** @class */ (function (_super) {
    __extends(TextEditor, _super);
    function TextEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.state = Object.assign({}, _this.getInitialState());
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }
    TextEditor.prototype.getInitialState = function () {
        return {
            value: RichTextEditor ? RichTextEditor.createEmptyValue() : ''
        };
    };
    TextEditor.prototype.componentDidMount = function () {
        if (RichTextEditor) {
            if (this.props.value) {
                this.setState({ value: RichTextEditor.createValueFromString(this.props.value, 'html') });
            }
        }
    };
    TextEditor.prototype.render = function () {
        var value = this.state.value;
        return (RichTextEditor ?
            React.createElement(RichTextEditor, { toolbarConfig: toolbarConfig, value: value, onChange: this.onChange }) : null);
    };
    TextEditor.prototype.onChange = function (value) {
        this.setState({ value: value });
        if (this.props.onChange) {
            // Send the changes up to the parent component as an HTML string.
            // This is here to demonstrate using `.toString()` but in a real app it
            // would be better to avoid generating a string on each change.
            var change = {
                name: this.props.name,
                newValue: value.toString('html')
            };
            this.props.onChange(change);
        }
    };
    return TextEditor;
}(React.Component));
exports.TextEditor = TextEditor;
var toolbarConfig = {
    // Optionally specify the groups to display (displayed in the order listed).
    display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
    INLINE_STYLE_BUTTONS: [
        { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
        { label: 'Italic', style: 'ITALIC' },
        { label: 'Underline', style: 'UNDERLINE' }
    ],
    BLOCK_TYPE_DROPDOWN: [
        { label: 'Normal', style: 'unstyled' },
        { label: 'Heading Large', style: 'header-one' },
        { label: 'Heading Medium', style: 'header-two' },
        { label: 'Heading Small', style: 'header-three' }
    ],
    BLOCK_TYPE_BUTTONS: [
        { label: 'UL', style: 'unordered-list-item' },
        { label: 'OL', style: 'ordered-list-item' }
    ]
};
//# sourceMappingURL=texteditor.js.map