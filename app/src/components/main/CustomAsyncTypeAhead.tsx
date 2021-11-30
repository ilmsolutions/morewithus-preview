import * as React from 'react';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';

require('../../assets/css/modules/typeahead/typeahead.css');
require('../../assets/css/modules/typeahead/token.css');
require('../../assets/css/modules/typeahead/loader.css');
require('../../assets/css/modules/typeahead/clearbutton.css');

interface ICustomAsyncTypeAheadProps extends React.Props<CustomAsyncTypeAhead>{
    id: string,
    name: string,
    allowNew: boolean,
    multiple: boolean,
    minLength?: number,
    options?: Array<string>,
    selected?: Array<string>,
    inputRef?: any,
    classes?: string,
    defaultOption: string,
    getResource(),
    onChange(event),
    required?:boolean 
}



export class CustomAsyncTypeAhead extends React.Component<ICustomAsyncTypeAheadProps, any>{

    public getInitialState(){
       //console.log('in initial state');
       return {
           allowNew: false, 
           multiple: false, 
           minLength: 0,
           options:[],
           selected:[],
           required: false
       };
    }

    constructor(props: ICustomAsyncTypeAheadProps){
        super(props);
        this.state = Object.assign({}, this.getInitialState(), {allowNew: props.allowNew, 
                                                                multiple: props.multiple, 
                                                                minLength: props.minLength,
                                                                selected: props.selected});  
        this._handleSearch = this._handleSearch.bind(this);   
        this._addKeyDownBehavior = this._addKeyDownBehavior.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    public componentDidUpdate(prevProps, prevState){
        const {multiple} = this.props;
        if(!multiple){
          this._addKeyDownBehavior();  
        }
         
    }

    render(){
        const {id, name, classes, defaultOption, inputRef, required} = this.props;
        const {selected} = this.state;
        //console.log(this.state);
        return (
           <div className={"input-list " + classes} data-name={name} ref={inputRef} data-required={required}
                data-value={selected} key="input-list">
               <AsyncTypeahead
                  ref={name}
                  key="input-list-typeahead"
                  onSearch={this._handleSearch}
                  placeholder={defaultOption} 
                  onChange={this.handleChange}  
                  {...this.state}                                              
                />
           </div>
        );
    }

    handleChange(selected){
        
        if (this.props.onChange) {

            var newValue = selected.map(function(o){
                return o.label ? o.label : o;
                }), 
            change = {
                oldValue: this.state.selected,
                newValue: newValue,
                name: this.props.name,
                type: 'inputlist'
            };
            
            var ilist = document.querySelector('.input-list[data-name="' + this.props.name + '"]');
            ilist.setAttribute('data-value', newValue);

            this.props.onChange(change);
        }

        this.setState({selected: selected});
    }

    _handleSearch(query){
        //console.log(query);
       if (!query) {
          return;
       } 
       //+ '?query=' + query
       this.props.getResource()
        .then(res => {
                    //console.log(res.data);
                    if(res && res.data){
                        let d = JSON.parse(res.data as any).result;
                        // console.log(d);
                        this.setState(state => ({
                            options: d
                        }));
                    // this.setState({options: res.data});        
                    }
            }); 

    }

    _addKeyDownBehavior = function(){
        const container = this.refs[this.props.name];
        if(!container) return;
        const input = container.querySelector('input.bootstrap-typeahead-input-main');
        if(!input || input.onkeydown) return;
        input.onkeydown = event => {
            if (event.keyCode !== 13) return;
            const items = container.querySelectorAll('.bootstrap-typeahead-menu > li');
            if (items.length >= 1) items[0].querySelector('a').click();
        };        
    }
}

