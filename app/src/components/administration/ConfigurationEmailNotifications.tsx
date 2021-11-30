import * as React from 'react';
import {DurationTypeMap} from '../../helpers/types';
import {ConfigurationCommons} from './configurationcommons';
import {TextEditor} from '../main/texteditor';

export class ConfigurationEmailNotifications extends ConfigurationCommons{
    constructor(props){
        super(props);
        this.state = Object.assign({}, {isdirty: false}, props); 
         this._bind('handleTextEditorChange');       
     }   

     
    render(){
        let {status, message} = this.props;
        let {row, isdirty} = this.state;
        row.custom = row.custom ? row.custom : {duration: null, 
                                                frequency: null,
                                                subject: '',
                                                body: '',
                                                bcc: '',
                                                cc: ''
                                               };
        //console.log(row);
    
        return <div className="card my-2 py-2"> 
        <form role="form" action="" method="post" 
         className="p-2 validate-form registration-form" noValidate>
          <div className="form-group row">
          {this.renderText(row.description, 'description', 'Description')}
          </div>
          <div className="form-group row">
          {this.renderText(row.custom.subject, 'custom.subject', 'Subject')}
          </div>          
          <div className="form-group row">
            {this.renderText(row.custom.cc, 'custom.cc', 'CC', {required: false, type: 'email'})}
            {this.renderText(row.custom.bcc, 'custom.bcc','BCC', {required: false, type: 'email', multiple: true})}
          </div>
          <div className="form-group row">
            {this.renderInputTypeCombo(DurationTypeMap, row.custom.duration
                                        , 'custom.duration', 'Duration', {required: false})}
            {this.renderInputTypeCombo(DurationTypeMap, row.custom.frequency
                                        , 'custom.frequency', 'Frequency', {required: false})}
                                        
          </div>
          <div className="form-group row">
          {this.renderCheckBox(row.active, 'active', 'Active')}
          </div>
          <div className="form-group row">
          {this.renderTextEditor(row.custom.body, 'custom.body', 'Body')}
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