import * as React from 'react';
import {browserHistory, Router} from 'react-router';
//import * as history from 'history';
import {render} from 'react-dom';
//import DataWrapper from './components/datawrapper';
import routes from './routes';


render(routes, document.querySelectorAll('[data-ui-role="content"]')[0]);