import * as React from 'react';
import {PropTypes} from 'react';
import {Header} from './main/header';

export class App extends React.Component<any, any> {  
    static childContextTypes = {
        data : PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        status: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        client: PropTypes.object,
        query: PropTypes.object
    };
   
    getChildContext(){
       return {
           data: this.props.context,
           status: this.props.status,
           client: this.props.client
       };
   }
    render(){
        return(
            <div> 
                 <Header /> 
                 {this.props.children}        
            </div>
        );
    }
}
