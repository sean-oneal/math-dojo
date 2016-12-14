import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import user from './reducers/index.jsx';
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import { Login } from './Login.jsx';
import { TeacherSignup } from './Signup.jsx';
import { TeacherDashboard } from './TeacherDashboard.jsx';

let store = createStore(user);

class Root extends React.Component {

  render () {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={Login}/>
          <Route path="teachersignup" component={TeacherSignup}/>
          <Route path="teacherdashboard" component={TeacherDashboard}/>
        </Router>
      </Provider>
    );
  }

}

render(<Root/>, document.getElementById('app'));
