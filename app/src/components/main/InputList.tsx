import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {functions} from '../../helpers/common';



interface IInputListProps extends React.Props<InputList>{
    id: string,
    name: string,
    values:  Array<string>,
    inputRef?: any,
    placeholder: string,
    onChange(object),
    required?:boolean
}

export class InputList extends React.Component<IInputListProps, any>{ 

    public getInitialState(){
        //console.log('in initial state');
        return {
            values:[],
            isdirty: false
        };
     }
 
     constructor(props : IInputListProps){      
       super(props);
       // set initial state
       //console.log('in constructor');
       this.state = Object.assign({}, this.getInitialState(), props);
       this.handleInputChange = this.handleInputChange.bind(this);
       this.handleAddClick = this.handleAddClick.bind(this);
       this.handleRemoveItem = this.handleRemoveItem.bind(this);
     }

    render(){
        let {values, isdirty} = this.state;
        let {placeholder, inputRef} = this.props;
    
        let rvalues = values && values.length > 0 ? values.map((value, i) => {
           return <li key={i} className='list-group-item'
                      data-index={i}
                      onClick={this.handleRemoveItem}
                      >
                     {value}
                     <span className='pull-right'>
                       <i className='ml-2 fa fa-close'></i>
                     </span>
                  </li>;
        }) : <li className='list-group-item text-muted'>No Items available</li>;
        return <div className='row input-list-items'>
            <div className='input-group'>
            <input type='text' className='form-control' 
                name={name}
                ref={inputRef}
                onChange={this.handleInputChange}
                    placeholder={placeholder} />
            <span className='input-group-btn'>
                <button className={'btn btn-secondary ' + (!isdirty ? 'disabled' : '')}
                        onClick={this.handleAddClick}
                        type='button'>
                <i className='ml-2 fa fa-plus'></i>
                </button>
            </span>
            </div>   
            <ul className='my-2 list-group'>
                {rvalues}
            </ul>           
        </div>;
    }

    handleInputChange(e){
        let target = e.target;
        this.setState({
            isdirty: target.value.length > 0 ? true : false
        });
    }

    handleAddClick(e){
        let target = e.target;
        let parent = functions.findAncestor(target, 'input-list-items');
        let input = parent.querySelector('input[type=text]');
        let {values} = this.state;
        let nvalues = values;
        if(nvalues){
            nvalues.push(input.value);
        }
        else
            nvalues = [input.value];
        this.setState({
            values: nvalues,
            isdirty: false
        });

        this.props.onChange({
            oldValue: values,
            newValue: nvalues,
            name: this.props.name,
            required: this.props.required
        });
        input.value = '';
    }

    handleRemoveItem(e){
        let target = e.target;
        let {values} = this.state;
        let nvalues = values;
        let index = target.dataset.index;
        nvalues.splice(index, 1);
        this.setState({
            values: nvalues
        });
        this.props.onChange({
            oldValue: values,
            newValue: nvalues,
            name: this.props.name,
            required: this.props.required
        });    
    }
}