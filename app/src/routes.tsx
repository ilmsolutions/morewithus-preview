//load global css
import './assets/css/offcanvas.css';
import './assets/css/styles.css';

import * as React from 'react';
import {IndexRoute, Route, Router, browserHistory} from 'react-router';
import {App} from './components/app';
import {Home} from './components/home';
//import {Profile} from './components/profile';
import {Search} from './components/search';
//import {Admin} from './components/admin';
import {InfoPage} from './components/infopage';
import {ContactUs} from './components/home/contactus';

function forceServerLoad(nextState, replaceState){
    //console.log('what does this do');    
    if(typeof(window) !== 'undefined')
       window.location.reload();
    return;
}

var prevpath = null;
function onUpdate(){
  let {params, location} = this.state;
  if(prevpath == null || prevpath != location.pathname){
    if (typeof window['gtag'] === 'function') {
        //console.log('getting in here');
        window['gtag']('config','UA-115293608-1');
    }  
  }
  prevpath = location.pathname;
}

/*
if(typeof(window) !== 'undefined')
browserHistory.listen((location) => {
    console.log('in browser history');
});
*/
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

export default (
    <Router onUpdate={onUpdate} history={browserHistory}>
    <Route path="/" component={App}>  
          <IndexRoute  component={Home}/>
          <Route path="/search/:query" component={Search}/>
          <Route path="/info/:type" component={InfoPage} />
          <Route path="/contactus" component={ContactUs} />          
          <Route path="auth">
             <Route path="/auth/login" onEnter={forceServerLoad} />
             <Route path="/auth/profile(/:tab)"  getComponent={(location, callback) => {
                        require.ensure([], function (require) {
                            callback(null, require('./components/profile').default);
                        });
             }}/>
             <Route path="/auth/logout" onEnter={forceServerLoad} />  
             <Route path="/auth/search/:query"  component={Search} />
             <Route path="/auth/admin(/:tab)"  getComponent={(location, callback) => {
                        require.ensure([], function (require) {
                            callback(null, require('./components/admin').default);
                        });
          }}/>
          </Route>
    </Route>
    </Router>
);


