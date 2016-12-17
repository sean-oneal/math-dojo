import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import user from './reducers/index.jsx';
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import { StudentLogin } from './student/StudentLogin.jsx';
import { Arena } from './student/Arena.jsx';
import { Chart } from './student/Chart.jsx';

let store = createStore(user);

var socket = io.connect();

class Root extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/student" component={StudentLogin}/>
          <Route path="arena" component={Arena}/>
          <Route path="chart" component={Chart}/>
        </Router>
      </Provider>
    );
  }
}

render(<Root/>, document.getElementById('app'));
