import React from 'react';
import {render} from 'react-dom';
import {User} from './User.jsx';
import {Opponent} from './Opponent.jsx';
import {Question} from './Question.jsx';
import {Display} from './Display.jsx';
import Axios from '../../../node_modules/axios/lib/axios.js'; 
import {Link} from 'react-router';
import { connect } from 'react-redux';

class Arena extends React.Component {
  constructor() {
    super();

    this.state = {
      userHP: 100,
      opponentHP: 100,
      question: '',
      evilCatAvatar: '',
      answer: '',
      message: '',
    };
  }

  componentWillMount() {
    this.generateQuestion();
    this.getEvilAvatar();
    this.getAvatar();
  }

  componentDidMount() {
    if (this.state.opponent === 0) {
      this.state.userlvl++;
    }
  }

  attack() {
    this.setState({
      opponentHP: this.state.opponentHP - 20,
      message: this.state.message = 'Great job! You\'ve damaged the enemy.',
    });

  }

  miss() {
    this.setState({
      userHP: this.state.userHP - 20,
      message: this.state.message = 'Oh no! You\'ve been hit!',
    });
  }

  checkHealth() {
    if (this.state.userHP <= 0) {
      this.setState({
        message: 'Sorry...try again',
      });
    } else if (this.state.opponentHP <= 0) {
      this.setState({
        message: 'You win!',
        userlvl: this.state.userlvl + 1,
        opponentHP: 100,
        userHP: 100,
      });
    }
  }

  generateQuestion() {
    // Level 1 - addition/subtraction of single digits
    var userlvl = this.props.userlvl;
    var operands = ['+', '-', '*', '/'];
    var firstDigit = Math.floor(Math.random() * Math.pow(10, userlvl));
    var secondDigit = Math.floor(Math.random() * Math.pow(10, userlvl));
    var operandIndex = Math.floor(Math.random() * 2);

    var answer = eval(firstDigit + operands[operandIndex] + secondDigit);
    this.setState({
      answer: answer
    });
    this.setState({
      question: firstDigit + ' ' + operands[operandIndex] + ' ' + secondDigit + ' = '
    });
  }


  checkAnswer(answer) {
    if (answer === '' + this.state.answer) {
      this.attack();
      this.checkHealth();
      this.generateQuestion();
    } else {
      this.miss();
      this.checkHealth();
      this.generateQuestion();
    }
  }

  getEvilAvatar() {
    var context = this;
    Axios.get('https://www.googleapis.com/customsearch/v1?key=' + window.GMAP_KEY + '&cx=009407302250325958776:7xs2zpwdaho&q=evil%20cat%20gif&searchType=image')
    .then(function (response) {
      var randomIndex = Math.floor(Math.random() * response.data.items.length);
      var evilCat = response.data.items[randomIndex].link;
      context.setState({
        evilCatAvatar: evilCat 
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getAvatar() {
    
  }

  render () {
    return (
      <div>
      <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">Cat Fight</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Help</a></li>
          </ul>
          <form className="navbar-form navbar-right">
            <input type="text" className="form-control" placeholder="Search..."></input>
          </form>
        </div>
      </div>
    </nav>


    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-3 col-md-2 sidebar">
          <ul className="nav nav-sidebar">
            <li className="active"><a href="#">Overview <span className="sr-only">(current)</span></a></li>
            <li><a href="#">Reports</a></li>
            <li><a href="#">Analytics</a></li>
            <li><a href="#">Export</a></li>
          </ul>
        </div>
        <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <h1 className="page-header">Arena</h1>

          <div className="row placeholders">

            <div className="col-xs-6 col-sm-3 placeholder userContainer">
              <User userImage={this.props.userAvatar} user={this.state.user}/>
              <h4>You Lvl.{this.props.userlvl}</h4>
              <span className="text-muted">Health</span>
              <progress value={this.state.userHP} max="100"></progress>
            </div>

            <div className="col-xs-6 col-sm-3 placeholder opponentContainer">
              <Opponent opponentImage={this.state.evilCatAvatar} opponent={this.state.opponent}/>
              <h4>Opponent</h4>
              <span className="text-muted">Health</span>
              <progress value={this.state.opponentHP} max="100"></progress>
            </div>
            </div>
            <div className="jumbotron">
              <Display display={this.state.message}/>
              <Question question={this.state.question}/>
              <form>
                <input id='answerForm' type='text' placeholder='Enter Answer'></input>
              </form>
              <p><a onClick={() => this.checkAnswer(document.getElementById('answerForm').value)}className="btn btn-lg btn-success" href="#" role="button">Answer</a></p>
          </div>

        </div>
      </div>
    </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  username : state.user,
  userlvl: state.userlvl,
  userAvatar: state.userAvatar,
});

Arena = connect(mapStateToProps)(Arena);

export {Arena};