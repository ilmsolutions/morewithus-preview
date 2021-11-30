import * as React from 'react';

interface ITextAreaProps extends React.Props<TextArea>{
        id: string,
        name: string,
        value: string,
        inputRef?: any,
        defaultMessage: string, 
        onChange(event),
        rows: number,
        maxlength: number, 
        required?:boolean

}

export class TextArea extends React.Component<ITextAreaProps, any>{
    
    public componentWillMount(){
    } 

    public getInitialState(){
       //console.log('in initial state');
       return {
           value: ''
       };
    }

     constructor(props: ITextAreaProps){
        super(props);
        let val = props.value ? props.value : '';
        this.state = Object.assign({}, this.getInitialState(), {value: val});  
        this.handleChange = this.handleChange.bind(this);      
     }

     render(){
         const {id, name, rows, maxlength, defaultMessage, inputRef, required} = this.props;
         const {value} = this.state;
         return(
             <div className="form-group" key={'text-area-' + name}>
              <textarea className="form-control" 
                    id={id} name={name}
                    value={value} ref={inputRef}
                    maxLength={maxlength} rows={rows}
                    placeholder={defaultMessage}
                    onChange={this.handleChange}
                    required={required}>
              </textarea>
              <span className="badge badge-info pull-right">{value.length + '/' +  maxlength}</span>
            </div>
         );
     }

     handleChange(e) {
       // e.preventDefault();
        e.stopPropagation();

        if(e.target.value.length > this.props.maxlength)
           return;

        this.setState({value: e.target.value});

        if (this.props.onChange) {
            this.props.onChange(e);
        }
       
     }      
}