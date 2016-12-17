import React from 'react';
import { render } from 'react-dom';
import Axios from '../../node_modules/axios/lib/axios.js';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { setUser, setStudent, setCorrect, setIncorrect } from './../actions/index.jsx';

class StudentListItem extends React.Component {

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

  //on click
  //fetch user data
  //set on state
  //move browserHistory to StudentProfile

  getStudent(studentUsername) {
    var context = this;
    Axios.post('http://localhost:3000/teacher/getstudent', {
      username: studentUsername,
      teacher: this.props.username,
      classroom: this.props.classroom
    })
    .then(function(res) {
      if (res.data.error) {
        console.log('unable to load student');
        context.setState({alertToUser: 'unsuccessfulregister'});
      } else {
        console.log(res.data);
        context.props.dispatch(setStudent({
          studentUsername: res.data.username,
          classroom: res.data.classroom,
          studentPassword: res.data.password,
          level: res.data.level,
          imageUrl: res.data.imageUrl
        }));
        console.log('AFTER PROP DISPATCH:');
        browserHistory.push('studentprofile');
      }
    });
  }

  render() {
    return (
      <div className="col-sm-3 col-md-2">
        <a onClick={() => this.getStudent(this.props.student)}>{this.props.student}</a>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  username: state.username,
  classroom: state.classroom,
  students: state.students,
  password: state.password,
  studentUsername: state.studentUsername,
  studentPassword: state.studentPassword,
  imageUrl: state.imageUrl,
  level: state.level,
});

StudentListItem = connect(mapStateToProps)(StudentListItem);

export {StudentListItem};
