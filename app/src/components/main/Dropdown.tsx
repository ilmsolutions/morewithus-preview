import * as React from 'react';
import * as ReactDOM from 'react-dom'
import {functions} from '../../helpers/common';
//const update = require('react-addons-update');

interface IDropdownProps extends React.Props<Dropdown>{
        id: string,
        name: string,
        options?: Array<object>,
        value?:  string | number,
        inputRef?: any,
        valueField: string,
        labelField: string,
        defaultOption: string, 
        getResource(),
        onChange(event),
        required?:boolean
}

export class Dropdown extends React.Component<IDropdownProps, any>{  


   
    public componentWillMount(){
        //console.log('am in component will mount');
        this.props.getResource().then(res => {
             if(res && res.data){
                this.setState(state => ({
                    options: Object.assign([], state.options, res.data)
                }));
               // this.setState({options: res.data});        
             }
        });
    } 

    public componentDidUpdate(prevProps, prevState){
        //IE Fix 
        //for validation API to mark it as valid appropriately when default selected
        //requires toggling the selection
      if(functions.detectIE()){
        var elem = (ReactDOM.findDOMNode(this) as HTMLSelectElement);
        let si = -1;
        if(elem && prevState.options.length < 1){
            //check for prevState.options.length < 1 
            //to ensure execution only after the options are loaded asyncrhonously
            si = elem.selectedIndex;
            const opts = elem.options;
            const ti = (si + 1) % opts.length;          
            opts.item(ti).selected = true;
            opts.item(si).selected = true;          
        }
      }  

     
    }

    public componentWillReceiveProps(nextProps){
    }

    public getInitialState(){
       //console.log('in initial state');
       return {
           options:[]
       };
    }

    constructor(props : IDropdownProps){      
      super(props);
      // set initial state
      //console.log('in constructor');
      this.state = Object.assign({}, this.getInitialState(), {selected: this.getSelectedFromProps(props)});
      this.handleChange = this.handleChange.bind(this);
    }


     render(){
         const {id, name, options, value, valueField, labelField, inputRef, required} = this.props;
         const {selected} = this.state;
         const soptions = this.state.options.map(function(o, i){
                return <option key={name + '-' + i} 
                               value={o[valueField]}>
                               {o[labelField]}
                        </option>
         });
         
         let defOption;
         if(this.props.defaultOption){
             defOption = <option value="">{this.props.defaultOption}</option>;
         }

         return (
           <select id={'_' + id} className="form-control" name={name} 
                   ref={inputRef} onChange={this.handleChange} value={selected} 
                   required ={required}> 
              {defOption}
              {soptions}
           </select>
         );
     }

    getSelectedFromProps(props) {
        var selected;
        //console.log('in getselectedfromprops');
        //console.log(props.value);
        if (props.value === null && props.options.length !== 0) {
            selected = props.options[0][props.valueField];
        } else {
            selected = props.value;
        }
        return selected;
    }

     handleChange(e) {
         e.preventDefault();
        if (this.props.onChange) {
            var change = {
              oldValue: this.state.selected,
              newValue: e.target.value,
              name: e.target.name,
              required: this.props.required
            }
            this.props.onChange(change);
        }
        this.setState({selected: e.target.value});
    }

}

