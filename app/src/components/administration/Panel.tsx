import * as React from 'react';
import {AuthBaseComponent} from '../commons/authbasecomponent';
import {ConfigurationList} from './configurationlist';
import {ConfigurationSelect} from './configurationselect';
import {Report} from './report';

export class Panel extends AuthBaseComponent{

    componentWillMount(){
        
    }
        
    componentDidMount(){
    }

    getInitialState(){
        return {
            status: true,
            message:''
        }
    }
    constructor(props: any){
        super(props);
        this.state = Object.assign({}, this.getInitialState(), props);
    }

    render(){
        let {type} = this.state;  
        let Control = this.getControl(type);
        let typePref =  Control === Report ? 'report.' : 'configuration.';
        return <Control getResource={this.getResource}
                                  postResource={this.postResource}
                                  deleteResource={this.deleteResource}
                                  type={typePref + type} />;
}

getControl(type){
    switch(true){
        case /emailnotifications/.test(type):
        case /rules/.test(type):
        case /pages/.test(type):
           return ConfigurationSelect;
        case /users/.test(type):
           return Report;
        default:
           return ConfigurationList;
    }
}


}