import * as React from 'react';
import {PropTypes} from 'prop-types';
import {BaseComponent} from './commons/basecomponent';
import {Main as Registration} from './registration/main';
import {Main as Subscriptions} from './subscriptions/main';
import {ChangePassword} from './commons/changepassword';
import {PaymentHistory} from './commons/paymenthistory';
import {functions} from '../helpers/common';

export default class Profile extends BaseComponent {
    static contextTypes = {
        data: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    };
    tabs = [
      {tag: 'profile', label: 'Profile', icon: 'fa-user'},
      {tag: 'changepassword', label: 'Change Password', icon: 'fa-key'},
      {tag: 'paymenthistory', label: 'Payment History', icon: 'fa-history'},
      {tag: 'subscriptions', label: 'Subscriptions', icon: 'fa-superpowers'}
    ];

   getInitialState(){
       return {
           status: true,
           message:'',         
           tab: this.tabs[0],
           user:{}
       }
   }
     constructor(props : any){      
      super(props);
      // set initial state
      //this.state = props.session || {isAuthenticated: false, user: null};
      var _tabs = props.params.tab ? this.tabs.filter((tab) => {
          return tab.tag.toLowerCase() == props.params.tab.toLowerCase();
      }) : null,
      tab = _tabs ? _tabs[0] : this.tabs[0];

      this.state = Object.assign({}, this.getInitialState(), props, {tab: tab});
      this._bind('renderTabs', 'renderContent', 'clickTab', 'toggleContent');
    }

    componentWillReceiveProps(nextProps) {
      //console.log('am in component will receive props');
    }

    componentWillMount(){
        //initialize context
        //console.log('profile will mount');
        if(!this.context.data){
            if(typeof(window) !== 'undefined'){
                // console.log(window['_INITIAL_STATE']);            
                this.context.data = window['_INITIAL_STATE'] || {session:{}};
               //console.log(this.context.data);
            }
            else
                this.context.data = {session:{}};   
       }

    }


    componentDidMount(){
        //console.log('am in component did mount');
    }   

    render(){    
         //const {session} = this.context.data;
         const {status, message, tab, user, location} = this.state;
         
         let alert;
         let cprops = Object.assign({}, {location : location});
         //if(!session.user.isverified){
          //   opts['disabled'] = 'disabled';
         //    alert = <div className="alert alert-warning">Please verify your email address before continuing</div>
         //}
         


              
    return (
      <div className="wide-main-page row no-gutters row-offcanvas row-offcanvas-left">
         <nav className="col-6 col-md-3 sidebar-offcanvas">
            <ul className="list-group" id="left-nav-tabs">
              {this.renderTabs(tab)}
            </ul>
         </nav>
         <main className="col-12 col-md-9 exhibit">
            {/*<div className="content-control">*/}
             {/* content goes here*/}         
             {this.renderContent(tab, cprops)}
            <span className="nav-pane-toggle" title="Show Exhibit Navigation" 
                  onClick={this.toggleContent}>
              <i className="fa fa-angle-left"></i>
            </span>                  
            {/*</div>          */}
         </main>
         </div>             
         );
    }; /*render*/

  renderContent = function(tab, props){
    switch(tab.tag){
      case 'profile':
        return <Registration {...props}/>;
      case 'subscriptions':
        return <Subscriptions {...props}/>;
      case 'changepassword':
        return <ChangePassword {...props}/>;
      case 'paymenthistory':
        return <PaymentHistory {...props}/>;
    }
  }

  renderTabs = function(tab){
      let clickHandler = this.clickTab;
      //console.log('in render tabs');
      //console.log(this.steps);
      //console.log(step);
      return this.tabs.map(function(d, itab){
         return <li key={'tab-' + itab} className={'parent' + ((d.tag == tab.tag) ? ' selected': '')}>
                  <a href={'/auth/profile/' + d.tag} data-tag={d.tag} 
                     onClick={clickHandler}>
                     {[<i key={0} className={'fa ' + d.icon}></i>, ' ', d.label]}
                  </a>
                </li>;
      })
  }

  clickTab = function(e){
      var tag = e.target.getAttribute('data-tag');
      var tab = this.tabs.filter((tab) => {
         return tab.tag == tag;
      });

      tab = tab ? tab[0] : this.tabs[0];
      this.toggleContent(e);
      this.setState({
        tab: tab
      });
  }

  toggleContent = function(e){
      var content = functions.findAncestor(e.target, 'row-offcanvas');      
      if(content)
         content.classList.toggle('active');
  }
}
