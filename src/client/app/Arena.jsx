import React from 'react';
import {render} from 'react-dom';
import {User} from './User.jsx';
import {Opponent} from './Opponent.jsx';
import {Question} from './Question.jsx';
import {Display} from './Display.jsx';
import Axios from '../../../node_modules/axios/lib/axios.js'; 
import {Link} from 'react-router';

class Arena extends React.Component {
  constructor() {
    super();

    this.state = {
      user: 100,
      userlvl: 1,
      userAvatar: 'https://cdn.meme.am/cache/images/folder803/100x100/8313803.jpg',
      opponent: 100,
      question: '',
      evilCatAvatar: '',
      answer: '',
      message: '',
    };
  }

  componentWillMount() {
    this.generateLevel1Question();
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
      opponent: this.state.opponent - 20,
      message: this.state.message = 'Great job! You\'ve damaged the enemy.',
    });

  }

  miss() {
    this.setState({
      user: this.state.user - 20,
      message: this.state.message = 'Oh no! You\'ve been hit!',
    });
  }

  checkHealth() {
    if (this.state.user <= 0) {
      this.setState({
        message: 'Sorry...try again',
      });
    } else if (this.state.opponent <= 0) {
      this.setState({
        message: 'You win!',
        userlvl: this.state.userlvl + 1,
        opponent: 100,
        user: 100,
      });
    }
  }

  generateLevel1Question() {
    var operands = ['+', '-'];
    var firstDigit = Math.floor(Math.random() * 10);
    var secondDigit = Math.floor(Math.random() * 10);
    var operandIndex = Math.floor(Math.random() * 2);

    var answer = eval(firstDigit + operands[operandIndex] + secondDigit);
    this.setState({
      answer: answer
    });
    this.setState({
      question: firstDigit + ' ' + operands[operandIndex] + ' ' + secondDigit + ' = '
    });
  }

  generateLevel2Question() {
    var operands = ['*', '/'];
    var firstDigit = Math.floor(Math.random() * 10);
    var secondDigit = Math.floor(Math.random() * 10);
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
      this.generateLevel1Question();
    } else {
      this.miss();
      this.checkHealth();
      this.generateLevel1Question();
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
              <User userImage={this.state.userAvatar} user={this.state.user}/>
              <h4>You Lvl.{this.state.userlvl}</h4>
              <span className="text-muted">Health</span>
              <progress value={this.state.user} max="100"></progress>
            </div>

            <div className="col-xs-6 col-sm-3 placeholder opponentContainer">
              <Opponent opponentImage={this.state.evilCatAvatar} opponent={this.state.opponent}/>
              <h4>Opponent</h4>
              <span className="text-muted">Health</span>
              <progress value={this.state.opponent} max="100"></progress>
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

export {Arena}

