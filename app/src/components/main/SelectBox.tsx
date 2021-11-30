import * as React from 'react';
import {functions} from '../../helpers/common';


interface ISelectBoxProps extends React.Props<SelectBox>{
        id: string,
        name: string,
        options?: Array<object>,
        values?:  Array<string | number>,
        inputRef?: any,
        valueField: string,
        labelField: string,
        defaultOption: string, 
        getResource(),
        onChange(event),
        required?:boolean    
}

export class SelectBox extends React.Component<ISelectBoxProps, any>{

    public componentDidMount(){
        window.addEventListener('click',  this.handleClick);

    }

    public componentWillUnmount(){
       window.removeEventListener('click', this.handleClick);
    }

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

    public getInitialState(){
       //console.log('in initial state');
       return {
           options:[]
       };
    }

    constructor(props : ISelectBoxProps){      
      super(props);
      // set initial state
      //console.log('in constructor');
      this.state = Object.assign({}, this.getInitialState(), {...this.getSelectionProps(props.values)});
      this.handleChange = this.handleChange.bind(this);
      this.removeSelection = this.removeSelection.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }

    render(){
        const {id, name, options, values, inputRef, valueField, labelField, defaultOption, required} = this.props;   
        const {selected} = this.state;
        let handleChange = this.handleChange; 
        let removeSelection = this.removeSelection; 
        const soptions = (o, i) => {
            let value = o[valueField];
            return (
                <div className="custom-control custom-checkbox" key={i} data-name={name}>
                <input type="checkbox" className="custom-control-input" 
                       id={value} name={name} 
                       value={value}
                       checked={selected.indexOf(value) >= 0 ? true : false}
                       onChange={handleChange}
                       formNoValidate />
                 <label className="custom-control-label" htmlFor={value}>{o[labelField]}</label>
                </div>
             );            
         };
        const sboxes = this.state.options.map(function(o, i){
            let children = o.children;
             return <div className="card" key={i}> 
                   <h6>{o[labelField]}</h6>
                   <div className="custom-controls-stacked">
                      {children.map(soptions)}
                   </div>
                  </div>;  
        });    
       const selectlabel = () =>{
           let tags;
           if(selected.length > 0){
              tags = selected.map(function(o, i){
                return <div className="token token-removeable" key={'tag-' + i}>
                          {o}
                         <span className="close-button" onClick={(e) => {
                                               e.nativeEvent.stopImmediatePropagation();
                                               e.stopPropagation(); 
                                               return removeSelection(o);                                  
                              }}>x</span>                          
                       </div>;
              });
           }
           else{
               tags = <div className="token">{defaultOption}</div>;
           }

         return  <div className="dropdown-label bootstrap-tokenizer">{tags}</div>;    
       }

        return <div className="form-control select-box-list" data-name={name} ref={inputRef} data-required={required}>
                   <div className="dropdown">
                        <div className="dropdown-toggle">                           
                               {selectlabel()}                           
                        </div>
                        <div className="dropdown-menu">
                             <div className="card-columns">
                                 {sboxes}
                             </div>
                        </div>
                   </div>
               </div>;  
    }

    handleClick(e){
        e.stopPropagation();
        var target = e.target,
            parent = functions.findAncestor(target, 'dropdown');
        if(!parent){
            var dds = document.getElementsByClassName('dropdown dropdown-menu');
            for(var i = 0; i <= dds.length - 1; i ++)
                dds[i].classList.remove('show');
        }
        else if(target.classList.contains('dropdown-toggle')){
           var parent = functions.findAncestor(target, 'dropdown'),
               children = parent.getElementsByClassName('dropdown-menu');
           parent.classList.toggle('show');
           for(var i = 0; i <= children.length - 1; i ++)           
                  children[i].classList.toggle('show');
        }
        return false;
    }

    getSelectionProps(values, change?){
       values = values ? values : [];
       var selected = [];

       if(change){
            var key = change.dataset.key;
            var index = values.indexOf(change.value);
            const {valueField} = this.props;

            if(change.checked === true) 
                values.splice(key, 0, change.value);
            else if(index >= 0)
                values.splice(index, 1); 
       }

       return {selected: values};
    }

    removeSelection(v){
        var input = document.querySelectorAll('input[type=checkbox][value="' + v + '"]:checked'),
            selected = this.state.selected;

         //console.log(input);
         //console.log(v);

        if(input.length > 0){

           selected.splice(selected.indexOf(v), 1);            

           if(this.props.onChange){
                var change = {
                oldValue: this.state.selected,
                newValue: selected,
                name: input[0].getAttribute('name'),
                type: 'selectboxlist',
                required: this.props.required
                }
                this.props.onChange(change);               
           }

           this.setState({selected: selected});
        }
    
        return true;
    }

     handleChange(e) {
       // e.preventDefault();
        e.stopPropagation();
        var selected = this.state.selected;        
        var sProps = this.getSelectionProps(selected, e.target);

        if (this.props.onChange) {
            var change = {
            oldValue: selected,
            newValue: sProps.selected,
            name: e.target.name,
            type: 'selectboxlist',
            required: this.props.required 
            }
            this.props.onChange(change);
        }

        //console.log(selected);
        this.setState({...sProps});
     } 
 
}