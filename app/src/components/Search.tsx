import * as React from 'react';
import {PropTypes} from 'prop-types';
import {AuthBaseComponent} from './commons/authbasecomponent';
import {Main} from './search/main';


export class Search extends AuthBaseComponent {
    static contextTypes = {
        data: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    };

    constructor(props){
        super(props);
        this.state = Object.assign({}, props, {isAuthenticated: false, user: null});
        this._bind('getContext', 'getResource');
    }
 
    componentDidMount(){
        //console.log('component did mount');
        let {data} = this.getContext();
        let iprops = (data && data.session) ? {isAuthenticated: data.session.isAuthenticated, 
                                               user: data.session.user}:
                             {isAuthenticated: false, user: null};
        if(iprops.isAuthenticated){
            this.getResource('user').then(res => {
                var user = JSON.parse(res.data.toString());                
                this.setState({
                    isAuthenticated: iprops.isAuthenticated,
                    user: Object.assign({}, user)
                 });   
            });
        }
    }

    render(){
        let{isAuthenticated, user} = this.state;
        let hidePrivate = (isAuthenticated && 
                           user && user.isactiveemployer ? 
                                   false : true); 
         
        //console.log(user);
        return <Main {...this.props} hidePrivate={hidePrivate} isAuthenticated={isAuthenticated}/>
    }


    getContext(){
        if(!this.context.data){
            if(typeof(window) !== 'undefined'){
                // console.log(window['_INITIAL_STATE']);            
                this.context.data = window['_INITIAL_STATE'] || {session:{}};
               //console.log(this.context.data);
            }
       }
       return this.context;        
    }
}