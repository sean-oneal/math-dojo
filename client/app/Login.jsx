import React from 'react';
import {render} from 'react-dom';
import Axios from '../../node_modules/axios/lib/axios.js';
import { connect } from 'react-redux';
import {setUser, setCorrect, setIncorrect} from './actions/index.jsx';
import {Link} from 'react-router';
import {browserHistory} from 'react-router'
import {Alerts} from './Alerts.jsx';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      alertToUser: null
    }
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  login(username, password) {
    if (!username || !password) {
      context.setState({alertToUser: 'invalidformsubmission'});
      return;
    }
    var context = this;
    Axios.post('http://localhost:3000/teacher/login', {
      username: username,
      password: password,
    })
    .then(function(res) {
      if (res.data.error) {
        console.log('unable to login');
        context.setState({alertToUser: 'unsuccessfulsignin'});
      } else {
        console.log('res.data:' + JSON.stringify(res.data));
        context.props.dispatch(setUser({
          username: res.data.username,
          classroom: res.data.classroom,
          students: res.data.students,
        }));
        console.log('Login Props:' + JSON.stringify(context.props));
        browserHistory.push('teacherdashboard');
      }
    })
  }

  dismissAlert() {
    this.setState({alertToUser: null});
  }

  render () {
    let alertToUser = this.state.alertToUser !== null ? <Alerts alert={this.state.alertToUser} dismiss={this.dismissAlert.bind(this)}/> : <div></div>

    return (
      <div className="container" onSubmit={this.handleSubmit}>
        <form className="form-signin">
          <h2 className="form-signin-heading">Teacher login</h2>
          <label className="sr-only">Username</label>
          <input type="username" id="inputUsername" className="form-control" placeholder="Username" required autoFocus/>
          <label className="sr-only">Password</label>
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
          <button onClick={() => this.login($('#inputUsername').val(), $('#inputPassword').val())} className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
          <hr></hr>
          <button onClick={() => browserHistory.push('teachersignup') } className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        </form>
        <div id='alerts'>
          {alertToUser}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  username : state.username,
  classroom : state.classroom,
  students : state.students
});

Login = connect(mapStateToProps)(Login);

export {Login};
