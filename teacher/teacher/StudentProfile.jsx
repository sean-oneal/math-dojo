import React from 'react';
import {render} from 'react-dom';
import Axios from '../../node_modules/axios/lib/axios.js';
import { Link} from 'react-router';
import { browserHistory} from 'react-router';
import { connect } from 'react-redux';
import { setUser, setCorrect, setIncorrect } from './../actions/index.jsx';
import { Navbar } from './Navbar.jsx';
import { Topbar } from './../partials/Topbar.jsx';
import { StudentListItem } from './StudentListItem.jsx';
import { AddStudent } from './AddStudent.jsx';
import { ReactCSSTransitionGroup } from 'react-addons-css-transition-group';


class StudentProfile extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {}
  componentDidMount() {}

  signOut() {
    var context = this;
    Axios.post('http://localhost:3000/teacher/logout')
    .then(function(res) {
      console.log(res);
      browserHistory.push('/');
    });
  }

  render () {
    console.log('StudentProfile view render:' + JSON.stringify(this.props));
    return (
    <div>

    <Topbar signOut={() => this.signOut()}/>

    <div className="container-fluid">
      <div className="row">
        <Navbar />
        <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        <img src={this.props.imageUrl}></img>
        <h2>Username: {this.props.studentUsername}</h2>
        <h2>Password: {this.props.studentPassword}</h2>
        <h2>Classroom: {this.props.classroom}</h2>
        <h2>Current Level: {this.props.level}</h2>
        </div>
      </div>
    </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => ({
  username : state.username,
  classroom : state.classroom,
  imageUrl : state.imageUrl,
  students : state.students,
  studentUsername : state.studentUsername,
  studentPassword : state.studentPassword,
  level : state.level
});

StudentProfile = connect(mapStateToProps)(StudentProfile);

export {StudentProfile};
