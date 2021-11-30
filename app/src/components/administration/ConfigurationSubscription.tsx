import * as React from 'react';
import {ConfigurationCommons} from './configurationcommons';
import {UserContextTypeMap, UserTypeMap, DurationTypeMap} from '../../helpers/types';
//import {InputTypeCombo} from '../main/inputtypecombo';
import {InputList} from '../main/inputlist';
import {functions} from '../../helpers/common';


const usercontexts = Object.keys(UserContextTypeMap).map(usercontext => {
    return UserContextTypeMap[usercontext];
});
const usertypes = Object.keys(UserTypeMap).map(usertype => {
    return UserTypeMap[usertype];
});

export class ConfigurationSubscription extends ConfigurationCommons{
    constructor(props){
        super(props);
        this.state = Object.assign({}, {key: 0, isdirty: false}, props); 
        this._bind('handleInputListChange'
                   , 'handleDropDownChange');       
    }

    componentDidMount(){
        //hack to add ref for input element in the 3rd party react-dates input element
        //ref is needed for validation to work correclty
         if(this.refs['date'] == null){
          this.refs['date'] = this.refs['form'].querySelectorAll('input[name=date]')[0];
          this.refs['date'].classList.add('form-control');
        }
    }
    render(){
        let {status, message} = this.props;
        let {row, key, isdirty} = this.state;
        row.custom = row.custom ? row.custom : {duration: null, 
                                                price: null,
                                                promotionprice: null,
                                                ispromoted: false, 
                                                features: []};
        
        //console.log(this.state);
        return <div className="card my-2 py-2" key={key}>
            <form role="form" action="" method="post" 
              ref = {(form) => this.refs['form'] = form}
              className="p-2 validate-form registration-form" noValidate> 
              <div className="form-group row">
               {this.renderSelect(usertypes, row.path, 'usertype', 'User Type')}
               {this.renderSelect(usercontexts, row.path, 'usercontext', 'User Context')}       
               </div>    
               <div className="form-group row">
               {this.renderText(row.label, 'label', 'Label')}
               {this.renderText(row.description, 'description', 'Description')}
               </div>
               <div className="form-group row">
               {this.renderCurrency(row.custom.price, 'custom.price', 'Price')}
               {this.renderInputTypeCombo(DurationTypeMap, 
                                          row.custom.duration, 
                                     'custom.duration', 'Duration')}
               </div>
               <div className="form-group row">
                 {this.renderCheckBox(row.custom.ispromoted, 'custom.ispromoted', 'Is Promoted')}
                 {this.renderCurrency(row.custom.promotionprice, 'custom.promotionprice', 
                          'Promotion Price', {disabled: !row.custom.ispromoted, required: row.custom.ispromoted})}
               </div>
               <div className="form-group row">
                 {this.renderDatePicker(row.custom.promotionexpireson, 'custom.promotionexpireson', 
                                        'Promotion Expires On', {disabled: !row.custom.ispromoted, required: row.custom.ispromoted})}
               </div>
               <div className="form-group row">
               {this.renderCheckBox(row.active, 'active', 'Active')}
               {this.renderCheckBox(row.custom.isfeatured, 'custom.isfeatured', 'Is Featured')}
               </div>
               <div className="form-group row">
                {this.renderInputList(row.custom.features, 'custom.features', 'Features')}                
               </div>
               <div className="form-group row">
               {this.renderActions(isdirty)}                
               </div>
            </form>
            {this.renderStatus(status, message)} 
        </div>;
    }

    renderSelect(options, path, fieldname, header){        
        const ropt = options.map((opt, i) => {
            return <option key={i} value={opt}>{opt}</option>
        });
        let selected = options.filter(opt => {
            return path && path.indexOf(',' + opt + ',') >= 0;
        });
        return <div className="col"> 
                <label htmlFor="label" id={fieldname + 'Label'}>
                {header + ': '}
                </label>        
              <select className='custom-select' 
                  name={fieldname} ref={fieldname}
                  defaultValue={(selected ? selected[0] : "")}
                  onChange={this.handleDropDownChange}
                  required>
                 <option value="">Select One</option>
                 {ropt}
               </select>
               <div className="error" id={fieldname +  'Error'}></div>
              </div>;
    }

      renderInputList(options, fieldname, header){

         return <div className="mx-2 col">
                 <label htmlFor="label" id={fieldname + 'Label'}>
                   {header}
                 </label> 
                <InputList  
                  values = {options}
                  name = {fieldname}
                  id = {'inputList' + fieldname}
                  placeholder = {header}
                  inputRef = {(el) => {this.refs[fieldname] = el}}
                  onChange={this.handleInputListChange}
                  required
                />
                <div className="error" id={fieldname +  'Error'}></div>
                </div>;
      }

      handleDropDownChange(event){
       const regexPatt = /(,(?!$)[^,]*)(,(?!$)[^,]*)?(,(?!$)[^,]*)?,/;
       let {row} = this.state;
       let path = row.path;
       let m = path.match(regexPatt);
       //reconstruct complete path
       path =  m ? ',' + m.slice(1).map((t, i) => {
           return t ? t.substring(1) : '';
       }).join() + ',' : path;
       //console.log(path);
       let target = event.target;
       let value = target.options[target.selectedIndex].value;
       let replacepatt = '$1' + 
                  (target.name == 'usertype' ? 
                  '$2,' + value + ',' :  ',' + value + '$3,');
      let npath = path.replace(regexPatt, replacepatt);
      this.customState('path', npath);
    }  

    
    handleInputListChange = function(change){
        this.customState(change.name, change.newValue);        
/*         if(this.validateChange){
            this.validateChange(change.type ? change.type : 'select', change.name);
        }
 */    }    
}