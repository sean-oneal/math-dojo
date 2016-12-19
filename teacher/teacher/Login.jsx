import React from 'react';
import { render } from 'react-dom';
import Axios from '../../node_modules/axios/lib/axios.js';
import { connect } from 'react-redux';
import { setUser, setCorrect, setIncorrect } from './../actions/index.jsx';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Alerts } from './../partials/Alerts.jsx';
import { NavBar } from './Navbar.jsx';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      alertToUser: null
    };
  }

  // handleClick(e) {
  //   e.preventDefault();

  // }

  clearFields() {
    $('#inputUsername').val('');
    $('#inputPassword').val('');
  }

  login(username, password) {
    if (!username || !password) {
      context.setState({alertToUser: 'invalidformsubmission'});
      return;
    }
    let context = this;
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
    }).catch(function(err) {
      context.clearFields();
      context.setState({alertToUser: 'unsuccessfulsignin'});
    });
  }


  dismissAlert() {
    this.setState({alertToUser: null});
  }

  render () {
    let alertToUser = this.state.alertToUser !== null ? <Alerts alert={this.state.alertToUser} dismiss={this.dismissAlert.bind(this)}/> : <div></div>;

    return (
      <div className="container" onClick={this.handleClick}>
        <form className="form-signin col-9">
          <h2 className="form-signin-heading">Math Dojo</h2>
          <h3 className="form-signin-heading">- Teacher Access -</h3>
          <div>
            <button onClick={function() { location.href = 'http://127.0.0.1:3000/auth/google'; } } className="btn btn-lg btn-block btn-social  btn-google" type="button"> <span className="fa fa-google"></span>Sign in with Google</button>
          </div>
        </form>
        <div id='alerts'>
          {alertToUser}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.username,
  classroom: state.classroom,
  students: state.students
});

Login = connect(mapStateToProps)(Login);

export { Login };
