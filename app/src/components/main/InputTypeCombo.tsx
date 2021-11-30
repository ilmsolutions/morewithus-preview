import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {functions} from '../../helpers/common';



interface IInputTypeComboProps extends React.Props<InputTypeCombo>{
    id: string,
    name: string,
    typeMap: Array<object>,
    selected?:  string | number,
    inputRef?: any,
    inputTypeRef?: any,
    placeholder: string,
    regexParser: RegExp,
    onChange(object),
    required?:boolean
}

export class InputTypeCombo extends React.Component<IInputTypeComboProps, any>{ 
      
    public getInitialState(){
        //console.log('in initial state');
        return {
            options:[],
            selected: null
        };
     }
 
     constructor(props : IInputTypeComboProps){      
       super(props);
       // set initial state
       //console.log('in constructor');
       this.state = Object.assign({}, this.getInitialState(), props);
       this.handleChange = this.handleChange.bind(this);
       this.handleInputChange = this.handleInputChange.bind(this);
       this.handleOptionClick = this.handleOptionClick.bind(this);
     }

     render(){
        const {inputRef, inputTypeRef, typeMap, placeholder, name, required} = this.props;
        let {selected} = this.state;
        //console.log(selected);
        let selectedParsed = this.valueParser(selected);
        //console.log(selectedParsed);
        let roption = Object.keys(typeMap).map((type, i) =>{
            return <li key={i} 
                       className={'dropdown-item type-item ' + 
                                  (type == selectedParsed.type ? 'active' : '')} 
                       data-value={type}
                       onClick={this.handleOptionClick}
                       >
               {typeMap[type]}
            </li>;
        });
        return <div className="input-type-combo input-group" 
                    data-value={selectedParsed.value}
                    data-type = {selectedParsed.type}
                    data-selected={selected}
                    data-required={required}
                    data-name={name}
                    >
                  <input type="number" className="form-control"                        
                         placeholder={placeholder}
                         defaultValue={selectedParsed.value}
                         name={name}
                         ref={inputRef}
                         onChange={this.handleInputChange} required={required}/>
                  <div className="input-group-prepend">                      
                      <button type="button"
                              ref={inputTypeRef}
                              name={"type-" + name} 
                              className="btn btn-secondary dropdown-toggle" 
                              value={selectedParsed.type}
                              data-required={required}
                              data-toggle="dropdown">
                      {typeMap[selectedParsed.type]}
                      </button>
                      <ul className="dropdown-menu">
                      {roption}
                      </ul>                        
                  </div>          
               </div>;
      
     }

     valueParser(value){
        const {typeMap} = this.props;        
        if(value){
            var regexParser = this.props.regexParser //reinit global regex paraser
            let valueParts = regexParser.exec(value.trim());
            //console.log(valueParts);
            if(valueParts && valueParts.length > 1){
                return  {
                    type: valueParts[2] ? valueParts[2] : valueParts[1], 
                    value: valueParts[2] ? valueParts[1] : null
                };
            }  
         }

         return {type: null, value: null};
     }

     handleInputChange(e){
        e.preventDefault();
        let target = e.target;
        let parent = functions.findAncestor(target, 'input-type-combo');        
        parent.dataset.value = target.value;
        this.handleChange(e);
     }

     handleOptionClick(e){
         e.preventDefault();
        let target = e.target;
        let parent = functions.findAncestor(target, 'input-type-combo');
        let label = parent ? parent.querySelector('button[name="type-' + this.props.name + '"]') : null;
        label.innerHTML = target.innerHTML;
        label.dataset.value = target.innerHTML;
        parent.dataset.type = target.dataset.value;
        this.handleChange(e);
     }

     handleChange(e){
        let target = e.target;
        let parent = functions.findAncestor(target, 'input-type-combo');
        let {selected} = this.state;
        let nselected = parent.dataset.value && parent.dataset.value.length > 0 ? 
                                     (parent.dataset.value  + parent.dataset.type) : null;
        //console.log(parent.dataset.value);
        //console.log(parent.dataset.type);
        this.props.onChange({
            oldValue: selected,
            newValue: nselected,
            name: this.props.name,
            required: this.props.required
        });

        this.setState({
            selected: nselected
        });
     }
}