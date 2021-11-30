import * as React from 'react';
import {PropTypes} from 'prop-types';
import {AuthBaseComponent} from './commons/authbasecomponent';
import {functions} from '../helpers/common';
import {Panel} from './administration/panel';


export default class Admin extends AuthBaseComponent{
    static contextTypes = {
        data: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    };
    tabs = [
        {tag: 'jobtypes', label: 'Job Types'},
        {tag: 'subscriptions', label: 'Subscriptions'},
        {tag: 'emailnotifications', label:'Email Notifications'},
        {tag: 'adverts', label: 'Ads'},
        {tag: 'rules', label: 'Rules'},
        {tag: 'users', label: 'User Report'},
        {tag: 'pages', label: 'Pages'},
        {tag: 'sociallogins', label: 'Social Logins'}
      ];

    constructor(props){
        super(props);

        var _tabs = props.params.tab ? this.tabs.filter((tab) => {
            return tab.tag.toLowerCase() == props.params.tab.toLowerCase();
        }) : null,
        tab = _tabs ? _tabs[0] : this.tabs[0];

        this.state = Object.assign({}, props, 
                        {tab: tab, 
                         isAuthenticated: false, 
                         user: null});
        this._bind('renderTabs', 'renderContent', 'clickTab', 'toggleContent', 
                   'getResource');
    }

    render(){
        const {tab, user, location} = this.state;
        let cprops = Object.assign({}, {location : location});
        
        return (
            <div className="wide-main-page row no-gutters row-offcanvas row-offcanvas-left">
                <nav className="col-6 col-md-3 sidebar-offcanvas">
                    <ul className="list-group" id="left-nav-tabs">
                    {this.renderTabs(tab)}
                    </ul>
                </nav>      
                <main className="col-12 col-md-9 exhibit">
                 
                    {this.renderContent(tab, cprops)}
                    <span className="nav-pane-toggle" title="Show Exhibit Navigation" 
                        onClick={this.toggleContent}>
                    <i className="fa fa-angle-left"></i>
                    </span>                  
                
                </main>                      
            </div>
        );
    }

    renderContent = function(tab, props){
        return <Panel type={tab.tag} />;
/*         switch(tab.tag){
          case 'jobtypes':
            return <Panel type={tab.tag} />;
          case 'subscriptions':
            return <div>Subscriptions</div>;
        }
 */      
    }

    renderTabs = function(tab){
        let clickHandler = this.clickTab;
        //console.log('in render tabs');
        //console.log(this.steps);
        //console.log(step);
        return this.tabs.map(function(d, itab){
           return <li key={'tab-' + itab} className={'parent' + ((d.tag == tab.tag) ? ' selected': '')}>
                    <a href={'/auth/admin/' + d.tag} data-tag={d.tag} 
                       onClick={clickHandler}>{d.label}</a>
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