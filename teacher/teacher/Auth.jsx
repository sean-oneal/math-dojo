import React from 'react';
import {render} from 'react-dom';
import Axios from '../../node_modules/axios/lib/axios.js';
import { connect } from 'react-redux';
import {setUser, setCorrect, setIncorrect} from './../actions/index.jsx';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import {Alerts} from './../partials/Alerts.jsx';

class Auth extends React.Component {
  constructor() {
    super();
  }

  render () {
    var cookie = decodeURI(getCookie('auth'));
    if (cookie === "") {
      browserHistory.push('/teacher/login');
    } else {
      console.log("COOKIE VALUE='" + cookie + "'");
      var parsedCookie = cookie.split('%2C');
      console.log(JSON.stringify({
        username: parsedCookie[1],
        classroom: parsedCookie[2],
        students: parsedCookie.splice(3),
      }));
      this.props.dispatch(setUser({
        username: parsedCookie[1],
        classroom: parsedCookie[2],
        students: parsedCookie.splice(3),
      }));
      console.log('Login Props:' + JSON.stringify(this.props));
      browserHistory.push('/teacher/teacherdashboard');
    }

    return (
      <div>This should NEVER load</div>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.username,
  classroom: state.classroom,
  students: state.students
});

var getCookie = function(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
};

Auth = connect(mapStateToProps)(Auth);

export {Auth};
