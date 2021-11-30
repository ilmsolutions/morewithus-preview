import * as React from 'react';
import * as update from 'immutability-helper';
import {Validate} from '../commons/validatecomponent';
import {InputTypeCombo} from '../main/inputtypecombo';
import {functions} from '../../helpers/common';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import * as moment from 'moment';

interface ActionMap{
    id: string;
    label: string; 
    action(any);
    classes: string;
    icon: string;
    disable?:(arg?: any) => boolean;   
}

export class ConfigurationCommons extends Validate{

    constructor(props){
       super(props);
       this._bind('handleInputChange', 'handleDateChange'
                  , 'handleInputTypeComboChange'
                  , 'save', 'remove', 'cancel'
                );
    }

    
    renderText(defvalue, fieldname, header, props?){
        props = props || {required: true, type: 'text'};
        var namePref = fieldname;
        return  (<div className="col">  
                  <label htmlFor="label" id={namePref + 'Label'}>
                  {header + ': '}
                  </label>
                  <input className="form-control" 
                   id={'input' + namePref} 
                   name={namePref} ref={namePref}
                   placeholder={header}
                   onChange={this.handleInputChange}
                   defaultValue={defvalue} {...props}/>
                  <div className="error" id={namePref +  'Error'}></div>
    </div>);      
      }


   renderCurrency(value, fieldname, header, props?){
       props = props ||{required: true};
        return (<div className="col"> 
         <label htmlFor="label" id={fieldname + 'Label'}>
         {header + ': '}
         </label>       
        <div className="input-group">
        <div className="input-group-prepend"><span className="input-group-text">$</span></div>
        <input type="number" step={0.01}
          className="form-control" 
          name={fieldname} ref={fieldname}
          onChange={this.handleInputChange}
          defaultValue={value}
          {...props}/>
        {/* <div className="input-group-append"><span className="input-group-text">.00</span></div> */}
      </div>
      <div className="error" id={fieldname + 'Error'}></div>
   </div>);      
     }


     renderCheckBox(defvalue, fieldname, header){
        var namePref = fieldname;
        return (<div className="form-check col">
                <label className="mt-4 form-check-label" 
                       htmlFor="label" id={namePref + 'Label'}>
                    <input className="form-check-input" type="checkbox" 
                        id={'input' + namePref}  
                        name={namePref} ref={namePref}  
                        onChange={this.handleInputChange}                     
                        defaultChecked={defvalue}/>
                    {header}
                </label>
                <div className="error" id={namePref +  'Error'}></div>
     </div>);
      }     
 
            
      renderInputTypeCombo(typeMap, defvalue, fieldname, header, props?){
        props = props || {required: true};
        let regex = new RegExp('^([\+\-]*[0-9]+)?(' + Object.keys(typeMap).join('|') + ')$', 'i');
        //console.log(regex);
        return (<div className="col">
                <label htmlFor="label" id={fieldname + 'Label'}>
                  {header + ': '}
                </label> 
               <InputTypeCombo    
                 typeMap = {typeMap}
                 selected = {defvalue}
                 name = {fieldname}
                 id = {'inputTypeCombo' + fieldname}
                 placeholder = {header}
                 inputRef = {(el) => {this.refs[fieldname] = el}}
                 inputTypeRef = {(el) => {this.refs['type-' + fieldname] = el}}
                 onChange={this.handleInputTypeComboChange}
                 regexParser = {regex}
                 {...props}
               />
               <div className="error" id={fieldname +  'Error'}></div>
      </div>);
     }   

     
    renderDatePicker(defvalue, fieldname, header, props?){
        props = props || {required: true};
        var namePref = fieldname;
        if(defvalue != null)
           props = Object.assign({}, props, {date: moment(defvalue)});

        return (<div className="col">
                <label htmlFor="label" id={'dateLabel'}>
                {header + ': '}
                </label>
                <SingleDatePicker
                        ref={namePref}  
                        onDateChange={(c) => this.handleDateChange(namePref, c)} 
                        focused={this.state.focused}
                        onFocusChange={(o) => this.setState(o)}                    
                        orientation="vertical" verticalHeight={400}
                        showClearDate small 
                        {...props}/> 
                <div className="error" id={'dateError'}></div>
     </div>);

    }

  renderActions(isdirty, actions?){
    actions = actions || ['save','delete', 'cancel'];
    const disabled = (isdirty) => {return !isdirty};
    const actionMap:ActionMap[] =  [
        {'id': 'save', 'label':'Save'
          , 'action': this.save, 'classes': 'btn btn-success'
          , 'icon': 'fa fa-save', 'disable': disabled},
        {'id': 'delete', 'label': 'Delete'
          , 'action': this.remove, 'classes': 'btn btn-dark'
          , 'icon': 'fa fa-trash', 'disable': () => {return false}},
        {'id': 'cancel', 'label': 'Cancel'
          , 'action': this.cancel, 'classes': 'btn btn-warning'
          , 'icon': 'fa fa-undo', 'disable': disabled}
    ];
    let renderAction =  actions.map((action, i) => {
        let am = actionMap.filter(map => {
            return map.id == action;
        });
        let fam = am ? am[0]: null;
        if(fam){
            let isdisabled = fam.disable ? fam.disable(isdirty) : false;
            return <button className={fam.classes + (isdisabled ? ' disabled': '')}
                     key={i}
                     onClick={fam.action} type="submit"
                     disabled={isdisabled}>
                     <i className={fam.icon} /> {fam.label}
                   </button>;

        }
        return '';
    })

    return <div className="my-2 btn-group d-flex justify-content-end">
    {renderAction}
    </div>;

  }
  
  renderStatus(status, message){
      let renderMessage = (message) ?       
        <span className={'form-control-label alert alert-' + (status ? 'success' : 'danger')}>
           {message}
         </span> : ''; 
      return (       
          <div className="form-group col-12"> 
           {renderMessage}
         </div>
      );
  }
  //----change handlers
    handleDateChange(name, change){
       this.customState(name, change ? new Date(change.toDate()) : null);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        //console.log(name + ' ' + value);
        //console.log(this.state);
        this.customState(name, value);
        
        if(this.validateChange){
            this.validateChange(target.type ? target.type : 'input', event.target.name);
        }
    }
    
    handleInputTypeComboChange(change){
        //console.log(change);
        this.customState(change.name, change.newValue);

        if(this.validateChange){
            this.validateChange('inputtypecombo', change.name);
        }
   }

    customStates(kvps){
       this.setState((state) => {
           kvps.forEach(kvp => {
               let namefields = kvp.name.split('.');
               if(namefields.length > 1){
                   state =  update(state, {
                        row:{[namefields[0]]: {
                            [namefields[1]]: {$set: kvp.value}
                        }},
                        isdirty:{$set: true}
                    });     
               }
               else{
               state = update(state, {
                    row:{[namefields[0]]: {$set: kvp.value}},
                    isdirty: {$set: true}
                 });                      
               }
           }); 

           return state;
       });
    }

    customState(name, value){
        //console.log(name + ' ' + value);
        const namefields = name.split('.');
        if(namefields.length > 1){              
            this.setState((state) => {
                return (state.row[namefields[0]]) ?
                              update(state, {row: {[namefields[0]] : 
                                                      {[namefields[1]]: {$set: value}}}, 
                                             isdirty: {$set: true}}) :
                              update(state, {
                                  row:{[namefields[0]]: {
                                      [namefields[1]]: {$set: value}
                                  }},
                                  isdirty:{$set: true}
                              });
            });          
        }
        else{
            this.setState((state) => {           
                return update(state, {
                   row:{[name]: {$set: value}},
                   isdirty: {$set: true}
                });   
            });
        }
     }

     //---action behaviors

     save(e){
        e.preventDefault();
        let {save} = this.props;
        let {row} = this.state;
        var target = e.target,
            parent = functions.findAncestor(target, 'validate-form');
        if(this.showFormErrors(parent)){
           row.value = row.label;
           save(row);
        }
        else{
            this.setState({
                  status: false
                , message: 'there are errors'
            });
          //console.log('there are errors');
        }
   
        return true;
       }

      remove(e){
          e.preventDefault();
          let {row} = this.state;
          //console.log('this is delete. needs a prompt');
          //console.log(row);
          this.props.remove({item: row._id});
          return true;
      }
   
      cancel(e){
          e.preventDefault();
          var target = e.target,
              {key} = this.state;
          //console.log('this is cancel. just needs a reload');
         
          this.setState(Object.assign({}, this.props,
                         {key: key + 1, 
                          isdirty: false}));
          return true;
      }
}
