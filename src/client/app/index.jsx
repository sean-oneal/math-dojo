import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import user from './reducers/index.jsx';
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import { Login } from './LoginSignin.jsx';
import { Arena } from './Arena.jsx';
import { ChartPage } from './Chart.jsx';

let store = createStore(user);

class Root extends React.Component {
  
  render () {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={Login}/>
          <Route path="/Arena" component={Arena}/>
          <Route path="/Chart" component={ChartPage}/>
        </Router>
      </Provider>
    )
  }
  
}

render(<Root/>, document.getElementById('app'));