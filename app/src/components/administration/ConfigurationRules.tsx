import * as React from 'react';
import {DurationTypeMap} from '../../helpers/types';
import {ConfigurationCommons} from './configurationcommons';

export class ConfigurationRules extends ConfigurationCommons{
    constructor(props){
        super(props);
        this.state = Object.assign({}, {isdirty: false}, props);    
     }     

     render(){
        let {status, message} = this.props;
        let {row, isdirty} = this.state;
        return <div className="card my-2 py-2"> 
        <form role="form" action="" method="post" 
             className="p-2 validate-form registration-form" noValidate>
          <div className="form-group row">
          {this.renderText(row.description, 'description', 'Description')}
          </div>
          <div className="form-group row">
          {this.renderText(row.custom.field, 'custom.field', 'Field',
                            {disabled: true, required: true, type: 'text'})}
          {this.renderInputTypeCombo(DurationTypeMap, row.custom.duration
                                        , 'custom.duration', 'Duration', {required: true})}          
          </div>
          <div className="form-group row">
          {this.renderCheckBox(row.active, 'active', 'Active')}
          </div>
          <div className="form-group row">
          {this.renderActions(isdirty, ['save'])}
          </div>          
        </form>
        {this.renderStatus(status, message)} 
        </div>;                                           
     }
}
