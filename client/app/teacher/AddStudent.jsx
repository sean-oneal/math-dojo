import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import { connect } from 'react-redux';
import {setUser, setCorrect, setIncorrect} from './../actions/index.jsx';
import Axios from '../../../node_modules/axios/lib/axios.js';

class AddStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      alertToUser: null
    };
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  dismissAlert() {
    this.setState({alertToUser: null});
  }

  addStudent(username, password) {
    if (!username || !password) {
      context.setState({alertToUser: 'invalidformsubmission'});
      return;
    }
    var context = this;
    Axios.post('http://localhost:3000/teacher/student', {
      username: username,
      password: password,
      teacher: this.props.username,
      classroom: this.props.classroom
    })
    .then(function(res) {
      if (res.data.error) {
        console.log('unable to add student');
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
    })
  }


  render() {

    let alertToUser = this.state.alertToUser !== null ? <Alerts alert={this.state.alertToUser} dismiss={this.dismissAlert.bind(this)}/> : <div></div>

    return (
      <div className="col-sm-6 col-md-6">
      <form className="form-signin" onSubmit={this.handleSubmit}>
        <h2 className="form-signin-heading">Add Student</h2>
        <label className="sr-only">Username</label>
        <input type="username" id="inputUsername" className="form-control" placeholder="Username" required autoFocus/>
        <label className="sr-only">Password</label>
        <input type="username" id="inputPassword" className="form-control" placeholder="Password" required/>
        <button onClick={() => this.addStudent($('#inputUsername').val(), $('#inputPassword').val())} className="btn btn-lg btn-primary btn-block" type="submit">Add Student</button>
      </form>
      <div id='alerts'>
        {alertToUser}
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  username : state.username,
  classroom : state.classroom,
  students : state.students
});

AddStudent = connect(mapStateToProps)(AddStudent);

export {AddStudent};
