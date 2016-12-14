import React from 'react';
import {render} from 'react-dom';
import Axios from '../../node_modules/axios/lib/axios.js';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import { connect } from 'react-redux';
import {setUser, setCorrect, setIncorrect} from './actions/index.jsx';
import {Navbar} from './Navbar.jsx';
import {Topbar} from './Topbar.jsx';
import {StudentListItem} from './StudentListItem.jsx';
import {AddStudent} from './AddStudent.jsx';
import {ReactCSSTransitionGroup} from 'react-addons-css-transition-group';


class TeacherDashboard extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {}

  componentDidMount() {}

  signOut() {
    var context = this;
    Axios.put('http://localhost:3000/user/' + context.props.username, {
      level: this.props.userlvl,
      score: score,
      correctAnswers: context.props.correctAnswers,
      incorrectAnswers: context.props.incorrectAnswers,
    })
    .then(function(res) {
      console.log(res);
      browserHistory.push('/');
    });
  }

  render () {
    console.log('teacher view render:' + JSON.stringify(this.props));
    return (
    <div>

    <Topbar signOut={() => this.signOut()}/>

    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <h1 className="page-header">Room: {this.props.classroom}</h1>
            <AddStudent />
            {this.props.students.map((student) => (
              <StudentListItem student={student}/>
            ))}
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
  students : state.students
});

TeacherDashboard = connect(mapStateToProps)(TeacherDashboard);

export {TeacherDashboard};
