import * as React from 'react';
import {ConfigurationCommons} from './configurationcommons';
import {functions} from '../../helpers/common';


export class ConfigurationSocials extends ConfigurationCommons{
    constructor(props){
        super(props);
        this.state = Object.assign({}, {key: 0, isdirty: false}, props);
    } 

    render(){
        let {status, message} = this.props;        
        let {row, key, isdirty} = this.state;
        row.custom = row.custom ? row.custom : {};
        return (
            <div className="card my-2 py-2" key={key}>
                <form role="form" action="" method="post" 
                className="p-2 validate-form registration-form" noValidate> 
                    <div className="form-group row">
                        {this.renderText(row.label, 'label', 'Label')}
                        {this.renderText(row.description, 'description', 'Description')}              
                    </div>
                    <div className="form-group row">
                      {this.renderText(row.custom.facebook, 'custom.facebook', 'Facebook', {type: 'url', required: false})}
                    </div>
                    <div className="form-group row">
                      {this.renderText(row.custom.google, 'custom.google', 'Google', {type: 'url', required: false})}
                    </div>
                    <div className="form-group row">
                      {this.renderText(row.custom.linkedin, 'custom.linkedin', 'Linkedin', {type: 'url', required: false})}
                    </div>
                    <div className="form-group row">
                      {this.renderText(row.custom.twitter, 'custom.twitter', 'Twitter', {type: 'url', required: false})}
                    </div>
                    {this.renderActions(isdirty)}     
                </form>
                {this.renderStatus(status, message)}                    
            </div>
        );
    }

}