import React from 'react';
import {render} from 'react-dom';
import {User} from './User.jsx';
import {Opponent} from './Opponent.jsx';
import {Question} from './Question.jsx';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user: 100,
      opponent: 100,
      question: '',
      answer: '',
    }
  }

  componentWillMount() {
    this.generateQuestion();
  }

  fight() {
    // need to fix logic of how hp goes down
    this.setState({user: this.state.user - 20});
    this.setState({opponent: this.state.opponent - 20});
  }

  generateQuestion() {
    // need to check level, not using multiplication or division for now
    var operands = ['+', '-', '*', '/']
    var firstDigit = Math.floor(Math.random() * 10);
    var secondDigit = Math.floor(Math.random() * 10);
    var operandIndex = Math.floor(Math.random() * 2);
    var answer = eval(firstDigit + operands[operandIndex] + secondDigit);
    this.setState({
      answer: answer
    })
    this.setState({
      question: firstDigit + ' ' + operands[operandIndex] + ' ' + secondDigit + ' = '
    });
  }

  checkAnswer(answer) {
    if (answer === '' + this.state.answer) {
      alert('you right son');
    } else {
      alert('damn you goofed');
    }
  }



  render () {
    return (
      <div>
        <p>Cat Fight!</p>
        <User user={this.state.user}/>
        <Opponent opponent={this.state.opponent}/>

        <Question question={this.state.question}/>
        <form>
          <input id='answerForm' type='text' placeholder='Enter Answer here'></input>
        </form>
        <button onClick={() => this.checkAnswer(document.getElementById('answerForm').value)}>Lezz Fite</button>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));