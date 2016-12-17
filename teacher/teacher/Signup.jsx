import React from 'react';
import {render} from 'react-dom';
import Axios from '../../node_modules/axios/lib/axios.js';
import { connect } from 'react-redux';
import {setUser, setCorrect, setIncorrect} from './../actions/index.jsx';
import {Link} from 'react-router';
import {browserHistory} from 'react-router'
import {Alerts} from './../partials/Alerts.jsx';

class TeacherSignup extends React.Component {
  constructor() {
    super();
    this.state = {
      alertToUser: null
    }
  }
  //
  handleSubmit(e) {
    e.preventDefault();
  }

  clearFields() {
    $('#inputUsername').val('');
    $('#inputPassword').val('');
    $('#inputClassroomName').val('');
  }

  register(username, password, classroomName) {
    if (!username || !password || !classroomName) {
      context.setState({alertToUser: 'invalidformsubmission'});
      return;
    }
    var context = this;
    Axios.post('http://localhost:3000/teacher/signup', {
      username: username,
      password: password,
      classroom: classroomName
    })
    .then(function(res) {
      if (res.data.error) {
        console.log('unable to register');
        context.setState({alertToUser: 'unsuccessfulregister'});
      } else {
        console.log(res.data);
        context.props.dispatch(setUser({
          username: res.data.username,
          classroom: res.data.classroom,
          students: res.data.students,
        }));
        browserHistory.push('/teacherdashboard');
      }
    }).catch(function(err){
      context.clearFields();
      context.setState({alertToUser: 'unsuccessfulregister'});
    });
  }

  dismissAlert() {
    this.setState({alertToUser: null});
  }

  render () {

    let alertToUser = this.state.alertToUser !== null ? <Alerts alert={this.state.alertToUser} dismiss={this.dismissAlert.bind(this)}/> : <div></div>

    return (
      <div className="container" onSubmit={this.handleSubmit}>
        <form className="form-signin">
          <h2 className="form-signin-heading">Teacher Signup</h2>
          <label className="sr-only">Username</label>
          <input type="username" id="inputUsername" className="form-control" placeholder="Username" required autoFocus/>
          <label className="sr-only">Password</label>
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
          <label className="sr-only">Classroom Name</label>
          <input type="classroomname" id="inputClassroomName" className="form-control" placeholder="Classroom Name" required autoFocus/>
          <button onClick={() => this.register( $('#inputUsername').val(), $('#inputPassword').val(), $('#inputClassroomName').val() ) } className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
          <hr></hr>
          <button onClick={() => {this.clearFields(); browserHistory.push('/');}} className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
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

TeacherSignup = connect(mapStateToProps)(TeacherSignup);

export {TeacherSignup};
