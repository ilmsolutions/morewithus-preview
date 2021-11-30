import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {functions} from '../../helpers/common';


var RichTextEditor;
if (typeof(window) !== 'undefined') { RichTextEditor = require('react-rte').default; }

interface ITextEditorProps extends React.Props<TextEditor>{
    id: string,
    name: string,
    inputRef?: any,
    value: string,
    placeholder: string,
    onChange(object),
    required?:boolean
}

export class TextEditor extends React.Component<ITextEditorProps, any>{

       getInitialState(){
            return {
                value: RichTextEditor ? RichTextEditor.createEmptyValue() : ''
            };
       }

       constructor(props: ITextEditorProps){
           super(props);
           this.state = Object.assign({}, this.getInitialState());
           this.onChange = this.onChange.bind(this);
       }

       componentDidMount(){
           if(RichTextEditor){
               if(this.props.value){
                   this.setState({value : RichTextEditor.createValueFromString(this.props.value, 'html')});
               }
           }
       }

       render(){
          let {value} = this.state;
          return (
            RichTextEditor ?
            <RichTextEditor
              toolbarConfig={toolbarConfig}
              value={value}
              onChange={this.onChange}
            /> : null
          );
       }

       onChange(value){
            this.setState({value: value});
            if (this.props.onChange) {
                // Send the changes up to the parent component as an HTML string.
                // This is here to demonstrate using `.toString()` but in a real app it
                // would be better to avoid generating a string on each change.
                var change = {
                    name: this.props.name,
                    newValue: value.toString('html')
                };
                this.props.onChange(
                   change
                );
            }
       }


}

const toolbarConfig = {
    // Optionally specify the groups to display (displayed in the order listed).
    display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
    INLINE_STYLE_BUTTONS: [
      {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
      {label: 'Italic', style: 'ITALIC'},
      {label: 'Underline', style: 'UNDERLINE'}
    ],
    BLOCK_TYPE_DROPDOWN: [
      {label: 'Normal', style: 'unstyled'},
      {label: 'Heading Large', style: 'header-one'},
      {label: 'Heading Medium', style: 'header-two'},
      {label: 'Heading Small', style: 'header-three'}
    ],
    BLOCK_TYPE_BUTTONS: [
      {label: 'UL', style: 'unordered-list-item'},
      {label: 'OL', style: 'ordered-list-item'}
    ]
  };