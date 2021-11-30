import * as React from 'react';
import {ConfigurationCommons} from './configurationcommons';
import {CustomAsyncTypeAhead} from '../main/customasynctypeahead';

export class ConfigurationForm extends ConfigurationCommons{
    constructor(props){
        super(props);
        this.state = Object.assign({}, {key: 0, isdirty: false}, props);
        this._bind('dropDownOnChange');
    }   

    render(){
    let {status, message} = this.props;
    let {row, key, isdirty} = this.state;
     row.custom = row.custom ? row.custom : {options: []};
    return <div className="card my-2 py-2"> 
       <form role="form" action="" method="post" key={key}
        className="validate-form registration-form" noValidate>
         {this.renderText(row.label, 'label', 'Label')}
         {this.renderText(row.description, 'description', 'Description')}
         {this.renderOptions(row.custom.options, 
                              'custom.options', 'Options')}
         {this.renderCheckBox(row.active, 'active', 'Active')}
         {this.renderText(row.order, 'order', 'Order')}
         {this.renderActions(isdirty)}
       </form>
 
       {this.renderStatus(status, message)} 
       </div>;
    }

    setIsDirty = function(on){
        let {isdirty} = this.state;
        if(isdirty != on)
          this.setState({isdirty: on});
    }

    dropDownOnChange = function(change){
        this.customState(change.name, change.newValue);        
        if(this.validateChange){
            this.validateChange(change.type ? change.type : 'select', change.name);
        }
    }

/* 
   renderstatus(status, message){

    if(status == true)
       return;

     return (                 
         <div className="form-group col-12 has-danger">
             <div className="form-control-label text-center">
                 {message}   
             </div>
        </div> 
     ) ;                
  }

 */
  renderOptions(options, fieldname, header){
    var namePref = fieldname;
    var d = {
              data: JSON.stringify({result: options})
            },
        foptions = options ? options.map(opt => {return {label: opt, value: opt}}) : options;

  return  <div className="col">
     <label htmlFor="" id={namePref + 'Label'}>{header + ': '}</label>
        <CustomAsyncTypeAhead id={'typeAhead' + namePref} 
            name={namePref} inputRef={(el) => {this.refs[namePref] = el}} 
            selected = {foptions}
            allowNew={true} multiple={true} minLength={1} 
            defaultOption="Add Options" 
            getResource={() => {return new Promise((res) => res(d))}}
            onChange={this.dropDownOnChange} required>
        </CustomAsyncTypeAhead>
     <div className="error" id={namePref + 'Error'}></div>
    </div>;
  }


}