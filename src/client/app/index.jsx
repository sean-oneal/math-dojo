import React from 'react';
import {render} from 'react-dom';
import {User} from './User.jsx';
import {Opponent} from './Opponent.jsx';
import {Question} from './Question.jsx';
import {Display} from './Display.jsx';
import Axios from '../../../node_modules/axios/lib/axios.js'; 

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user: 100,
      userlvl: 1,
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
    } else {
      this.miss();
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

  render () {
    return (
      <div>
        <p>Cat Fight!</p>

        <User user={this.state.user}/>
        <progress value={this.state.user} max="100"></progress>

        <Opponent opponentImage={this.state.evilCatAvatar} opponent={this.state.opponent}/>
        <progress value={this.state.opponent} max="100"></progress>

        <Question question={this.state.question}/>
        <form>
          <input id='answerForm' type='text' placeholder='Enter Number'></input>
        </form>
        <Display display={this.state.message}/>

        <button onClick={() => this.checkAnswer(document.getElementById('answerForm').value)}>Lezz Fite</button>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));


