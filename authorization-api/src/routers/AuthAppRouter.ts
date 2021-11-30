import * as express from 'express';
import * as oauth2 from  '../policies/oauth2';
import * as local from '../policies/local-signin';
import {Library} from '../utils/library';
import {App} from '../components/App';
import {Login} from '../components/Login';
import {Decision} from '../components/Decision';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {renderToString,renderToStaticMarkup} from 'react-dom/server';


let appRouter = express.Router();

appRouter.post('/login', local.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '../login',
    failureFlash: true
}));

appRouter.get('/authorize', oauth2.authorization,
  function(req, res) {    
    const data = {
                    transactionId: req.oauth2.transactionID,
                    user: req.user,
                    client: req.oauth2.client
    };
    const elem = React.createElement(App,
                                 {context: data},
                                  React.createElement(Decision));

    res.locals.metaTags = {
      title: Library.META_DEFAULT_TITLE
    }; 
                        
    res.render('index', {
        content: renderToString(elem),
        context: {}        
    });    

  });


appRouter.post('/decision', oauth2.decision);

appRouter.post('/token', oauth2.token);

appRouter.get('/logout', function(req, res){ 
  var returnTo = req.query.returnTo;
  req.logout();
  req.session.destroy(function(){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    return res.redirect(returnTo);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
  }); 
});
export = appRouter;