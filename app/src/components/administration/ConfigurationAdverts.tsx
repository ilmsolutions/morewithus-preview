import * as React from 'react';
import {ConfigurationCommons} from './configurationcommons';
import {functions} from '../../helpers/common';


export class ConfigurationAdverts extends ConfigurationCommons{
    constructor(props){
        super(props);
        this.state = Object.assign({}, {key: 0, isdirty: false}, props);
        this._bind('renderContent', 'renderInputFile', 'handleInputFileChange', 'cancelPreview') 
    }

    render(){
        let {status, message} = this.props;        
        let {row, key, isdirty} = this.state;
        row.custom = row.custom ? row.custom : {url: '', image: null, file: null};

       return <div className="card my-2 py-2" key={key}>
            <form role="form" action="" method="post" 
              className="p-2 validate-form registration-form" noValidate> 
              <div className="form-group row">
                {this.renderText(row.label, 'label', 'Label')}
                {this.renderText(row.description, 'description', 'Description')}              
              </div>
              <div className="form-group row">
                {this.renderText(row.custom.url, 'custom.url', 'Link', {type: 'url', required: true})}
              </div>
               {this.renderContent(row)}
               {this.renderActions(isdirty)}                
            </form> 
            {this.renderStatus(status, message)}                    
        </div>;
    }

    renderContent(row){
         if(row.custom.image){
             return (
                <div className="form-group card">
                {row.custom.image ? 
                  <button type="button" className="text-right close"
                          onClick={this.cancelPreview} 
                          aria-label="Close">
                       <span aria-hidden="true">&times;</span>
                  </button> : ''}
                  <img src={row.custom.image} className='card-img-bottom' />
               </div>                 
             );
         }
       return (
         <div className="form-group row">
           {this.renderInputFile(row.custom.file ? row.custom.file : null
                              , 'custom.file', 'Choose File', {
             type: 'file',
             accept: 'image/*',
             required: true 
         })}
        </div>
       );    
    }

    renderInputFile(defvalue, fieldname, header, props?){
        props = props || {required: true, type: 'file'};
        var namePref = fieldname;
        return  (<div className="col">  
                  <label htmlFor="label" id={namePref + 'Label'}>
                  {header}
                  </label>
                  <input className="form-control" 
                   id={'input' + namePref} 
                   name={namePref} ref={namePref}
                   placeholder={header}
                   onChange={this.handleInputFileChange}
                   defaultValue={defvalue} {...props}/>
                  <div className="error" id={namePref +  'Error'}></div>
    </div>);      
    }

    handleInputFileChange(e){
        e.preventDefault();
        let reader = new FileReader();
        let target = e.target;
        let file = e.target.files[0];
        let name = e.target.name;
        
        reader.onloadend = () => {
            console.log(target.files[0]);
            this.customStates([
                { name: name, value: file.name}
                ,{ name: 'custom.image', value: reader.result}
             //   ,{name: 'custom.file', value: file}
            ]);    
        }
        reader.readAsDataURL(file);      
    }

    cancelPreview(e){
       e.preventDefault();
       let target = e.target,
           parent = functions.findAncestor(target, 'validate-form');
       this.customStates([
            { name: 'custom.file', value: null}
           ,{ name: 'custom.image', value: null}
        ]); 
    }

}