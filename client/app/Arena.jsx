import React from 'react';
import {render} from 'react-dom';
import {User} from './User.jsx';
import {Opponent} from './Opponent.jsx';
import {Question} from './Question.jsx';
import {Display} from './Display.jsx';
import Axios from '../../node_modules/axios/lib/axios.js';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import { connect } from 'react-redux';
import {setUser, setCorrect, setIncorrect} from './actions/index.jsx';
import {Navbar} from './Navbar.jsx';
import {Topbar} from './Topbar.jsx';
import {ReactCSSTransitionGroup} from 'react-addons-css-transition-group';


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
      timer: 10,
      reset: false,
    };
  }

  componentWillMount() {
    this.generateQuestion();
    this.getEvilAvatar();
    this.timer()
  }

  componentDidMount() {
    if (this.state.opponent === 0) {
      this.state.userlvl++;
    }
  }

  attack() {
    var user = document.getElementById('userContainer');
    var opponent = document.getElementById('opponentContainer');
    var context = this;

    this.setState({
      opponentHP: this.state.opponentHP - 20,
      message: this.state.message = 'Great job! You\'ve damaged the enemy.',
    });

    user.style.animation = 'attack2 1000ms infinite';
    opponent.style.animation = 'shake 1000ms infinite';
    setTimeout(() => { user.style.animation = 'attack2 1000ms paused'; }, 1000);
    setTimeout(() => { opponent.style.animation = 'shake 1000ms paused'; }, 1000);
  }

  miss() {
    var opponent = document.getElementById('opponentContainer');
    var user = document.getElementById('userContainer');
    var context = this;

    this.setState({
      userHP: this.state.userHP - 20,
      message: this.state.message = 'Oh no! You\'ve been hit! Meow!',
    });
    opponent.style.animation = 'attack 1000ms infinite';
    user.style.animation = 'shake 1000ms infinite';
    setTimeout(() => { opponent.style.animation = 'attack 1000ms paused'; }, 1000);
    setTimeout(() => { user.style.animation = 'shake 1000ms paused'; }, 1000);
     setTimeout(function(){
      context.state.message = '';
    }, 2000)
  }

  checkHealth() {
    if (this.state.userHP <= 0) {
      this.setState({
        message: 'Sorry...try again',
      });
    } else if (this.state.opponentHP <= 0) {
      this.setState({
        message: 'You win!',
        opponentHP: 100,
        userHP: 100,
      });
      // POOR IMPLEMENTATION, NEED TO MAKE NEW LVL UP ACTION
      this.props.dispatch(setUser({
        username: this.props.username,
        userlvl: this.props.userlvl + 1,
        userAvatar: this.props.userAvatar,
      }));
    }
  }

  generateQuestion() {

    let userlvl = this.props.userlvl; //this userlvl corrlates to the evil cat 
    document.cookie = `userlvl=${userlvl}`;
    Axios.get('http://localhost:3000/mathApi/arena')
    .then((result) => {
      this.setState({
        answer: result.data.answer,
        question: result.data.question,
        operand: result.data.operand
      })
    .catch((error) => console.log(error))
    });
  
  }

  timer(){
    let context = this;
    this.setState({
      reset: false
    });
    var sec = 10;
    var timerOn = setInterval(function(){
    var a = new Date();
        document.getElementById("timer").innerHTML =" : " + sec ;
        sec--;
        context.setState({timer:sec})
        if (sec === 0 || context.state.reset === true){
           clearInterval(timerOn);
           if (sec === 0) { context.miss()}
        }}, 1000);
  }

  resetTimer(){
    var context = this;
    this.setState({ reset:true })
    setTimeout(function(){ context.timer()},1000)
  }

  checkAnswer(answer) {
    var context = this;
    if (answer === '' + this.state.answer) {
      var newCorrect = Object.assign({}, context.props.correctAnswers);
      newCorrect[context.state.operand]++;
      context.props.dispatch(setCorrect(newCorrect));

      this.attack();
      var user = document.getElementById('userContainer');
      // user.style.animation = 'attack2 1000ms paused';

      this.checkHealth();
      this.generateQuestion();
      this.resetTimer();

    } else {
      var newIncorrect = Object.assign({}, context.props.incorrectAnswers);
      newIncorrect[context.state.operand]++;
      context.props.dispatch(setIncorrect(newIncorrect));

      this.miss();
      var opponent = document.getElementById('opponentContainer');
      // opponent.style.animation = 'attack 1000ms paused';

      this.checkHealth();
      this.generateQuestion();
      this.resetTimer();
    }
    document.getElementById('answerForm').value = '';
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
    .catch((error) => console.log(error));
  }

  signOut() {
    var context = this;
    var score = 0;
    for (var operand in context.props.correctAnswers) {
      score += context.props.correctAnswers[operand];
    }
    for (var operand in context.props.incorrectAnswers) {
      score -= context.props.incorrectAnswers[operand];
    }
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
    return (
    <div>

    <Topbar signOut={() => this.signOut()}/>

    <div className="container-fluid">
      <div className="row">

        <Navbar />

        <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <h1 className="page-header">Arena</h1>

          <div className="row placeholders">

            <div className="col-xs-6 col-sm-3 placeholder" id="userContainer">
              <User userImage={this.props.userAvatar} user={this.state.user}/>
              <h4>{this.props.username} Cat </h4>
              <span className="text-muted">Health</span>
              <progress value={this.state.userHP} max="100"></progress>
            </div>

            <div className="col-xs-6 col-sm-3 placeholder" id="opponentContainer">
              <Opponent opponentImage={this.state.evilCatAvatar} opponent={this.state.opponent}/>
              <h4>Rival Cat Lvl:{this.props.userlvl}</h4>
              <span className="text-muted">Health</span>
              <progress value={this.state.opponentHP} max="100"></progress>
            </div>
            </div>
            <div className="jumbotron">
              <Display display={this.state.message}/>
              <div>You have <span id="timer">{this.state.timer}</span> seconds left!</div>
              <Question question={this.state.question}/>
              <form>
                <input id='answerForm' type='text' placeholder='Enter Answer'></input>
              </form>
              <p>
                <a onClick={() => this.checkAnswer(document.getElementById('answerForm').value)}className="btn btn-lg btn-success" href="#"role="button">Answer</a>
              </p>
          </div>

        </div>
      </div>
    </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => ({
  username : state.username,
  userlvl: state.userlvl,
  userAvatar: state.userAvatar,
  correctAnswers: state.userCorrectAnswers,
  incorrectAnswers: state.userIncorrectAnswers,
});

Arena = connect(mapStateToProps)(Arena);

export {Arena};
