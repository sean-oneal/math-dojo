import React from 'react';
import {render} from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import {Login} from './LoginSignin.jsx';
import {Arena} from './Arena.jsx';

render((
  <Router history={hashHistory}>
    <Route path="/" component={Login}/>
    <Route path="/Arena" component={Arena}/>
  </Router>
), document.getElementById('app'))