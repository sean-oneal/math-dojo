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
    this.setState({question: '5 + 5'});
  }

  checkAnswer(answer) {
    console.log(answer);

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