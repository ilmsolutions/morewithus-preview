import * as React from 'react';


interface ICheckboxListProps extends React.Props<CheckboxList>{
        id: string,
        name: string,
        options?: Array<object>,
        values?:  Array<string | number>,
        inputRef?: any,
        checkAllValue?: string,
        valueField: string,
        labelField: string,
        getResource(),
        onChange(event),
        required?:boolean
}

export class CheckboxList extends React.Component<ICheckboxListProps, any>{
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

    public componentDidMount(){
    }

    public componentWillReceiveProps(nextProps){
    }

    public getInitialState(){
       //console.log('in initial state');
       return {
           options:[],
           checkAll: false
       };
    }

    constructor(props : ICheckboxListProps){      
      super(props);
      // set initial state
      //console.log('in constructor');

      this.state = Object.assign({}, this.getInitialState(),{...this.getSelectionProps(props.values)});
      this.handleChange = this.handleChange.bind(this);
    }

     render(){
         const {id, name, options, values, valueField, labelField, inputRef, required} = this.props;
         const {selected, checkAll} = this.state;
         let handleChange = this.handleChange;
         const soptions = this.state.options.map(function(o, i){
             let value = o[valueField];
             return (
                <div className="custom-control custom-checkbox" key={i}>
                <input type="checkbox" className="custom-control-input" 
                       id={value} name={name} 
                       value={value}
                       checked={checkAll || selected.indexOf(value) >= 0 ? true : false}
                       onChange={handleChange}
                       formNoValidate />
                <label className="custom-control-label" htmlFor={value}>{o[labelField]}</label>
                </div>
             );
         });
         

         return (
            <div id={id} className="form-control check-box-list" data-name={name} ref={inputRef} data-required={required}>            
                {soptions}
                {/*<input type="hidden" ref={this.props.inputRef} value={selected.Join(',')} required={required}></input>*/}
            </div>
         );
     }

/*    getSelectedFromProps(props) {
         if(props.values != null && props.values.length > 0){
           return props.values;
         }
         return [];
    }*/

     getSelectionProps(values, change?){
         values = values ? values : [];

         var selected = [],
             checkAll = false;

            //check for target related change
             if(change){
                    var key = change.dataset.key;
                    var index = values.indexOf(change.value);
                    const {valueField, checkAllValue} = this.props;

                    if(change.checked === true) 
                        values.splice(key, 0, change.value);
                    else if (change.value == checkAllValue)
                        values = [];
                    else if(this.state.checkAll){
                        //return all values except the check all value && the current target value
                        values = this.state.options.filter(function(o){
                            return (o[valueField] != checkAllValue) &&
                                    (o[valueField] != change.value);
                        }).map(function(o){
                            return o[valueField];
                        });
                    }
                    else if(index >= 0)
                        values.splice(index, 1); 
             }

            if(this.props.checkAllValue && //if checkall option is available
            (values.indexOf(this.props.checkAllValue) >= 0 || 
                (this.state && values.length == this.state.options.length - 1)))//if all options are checked
            {
                selected = [this.props.checkAllValue];
                checkAll = true;
            }
            else
            selected = values;

        return {selected: selected, checkAll: checkAll};
     }

     handleChange(e) {
        e.stopPropagation();
        var selected = this.state.selected;        
        var sProps = this.getSelectionProps(selected, e.target);

        if (this.props.onChange) {
            var change = {
            oldValue: selected,
            newValue: sProps.selected,
            name: e.target.name,
            type: 'checkboxlist',
            required: this.props.required
            }
            this.props.onChange(change);
        }

        //console.log(selected);
        this.setState({...sProps});
     }    

}