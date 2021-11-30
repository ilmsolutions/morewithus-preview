import * as React from 'react';
import {ConfigurationCommons} from './configurationcommons';
import {TextEditor} from '../main/texteditor';

export class ConfigurationPages extends ConfigurationCommons{
    constructor(props){
        super(props);
        this.state = Object.assign({}, {isdirty: false}, props); 
         this._bind('handleTextEditorChange');       
     }   

     
    render(){
        let {status, message} = this.props;
        let {row, isdirty} = this.state;
        row.custom = row.custom ? row.custom : {
                                                title: ''
                                                , body: ''
                                                , description: ''
                                                , keywords: ''                                                
                                               };
        //console.log(row);
    
        return <div className="card my-2 py-2"> 
        <form role="form" action="" method="post" 
         className="p-2 validate-form registration-form" noValidate>
          <div className="form-group row">
          {this.renderText(row.description, 'description', 'Description')}
          </div>
          <div className="form-group row">
          {this.renderText(row.custom.title, 'custom.title', 'Page Title')}
          </div>          
          <div className="form-group row">
          {this.renderCheckBox(row.active, 'active', 'Active')}
          </div>
          <div className="form-group row">
          {this.renderTextEditor(row.custom.body, 'custom.body', 'Body')}
          </div>
          <div className="form-group row">
          {this.renderText(row.custom.description, 'custom.description', 'Meta Description', {required: false, type: 'text'})}
          </div>
          <div className="form-group row">
          {this.renderText(row.custom.keywords, 'custom.keywords', 'Meta Keywords', {required: false, type: 'text'})}
          </div>
          <div className="form-group row">
          {this.renderActions(isdirty, ['save'])}
          </div>
        </form>
          {this.renderStatus(status, message)} 
        </div>;
    }

    renderTextEditor(value, fieldname, header){
        return <div className="col">
        <label htmlFor="label" id={fieldname + 'Label'}>
          {header}
        </label> 
       <TextEditor    
         name = {fieldname}
         id = {'textEditor' + fieldname}
         value = {value}
         placeholder = {header}
         inputRef = {(el) => {this.refs[fieldname] = el}}
         onChange={this.handleTextEditorChange}
         required
       />
       <div className="error" id={fieldname +  'Error'}></div>
       </div>;

    }

    handleTextEditorChange(change){
        //console.log(value);
        this.customState(change.name, change.newValue);
    }

}