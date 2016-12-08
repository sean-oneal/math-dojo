import React from 'react';
import {render} from 'react-dom';
import {User} from './User.jsx';
import {Opponent} from './Opponent.jsx';
import {Question} from './Question.jsx';
import Axios from '../../../node_modules/axios/lib/axios.js'; 

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user: 100,
      opponent: 100,
      question: '',
      evilCatAvatar: '',
    }
  }

  componentWillMount() {
    this.generateQuestion();
    // var evilCat = this.getEvilAvatar();
    // this.setState({evilCat: evilCat});
    this.getEvilAvatar();
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
    this.fight();
  }

  getEvilAvatar() {
    var context = this;
    Axios.get('https://www.googleapis.com/customsearch/v1?key=' + window.GMAP_KEY + '&cx=009407302250325958776:7xs2zpwdaho&q=evil%20cat%20gif&searchType=image')
    .then(function (response) {
      var randomIndex = Math.floor(Math.random() * response.data.items.length);
      var evilCat = response.data.items[randomIndex].link;
      console.log(evilCat);
      context.setState({
        evilCatAvatar: evilCat 
      })
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
          <input id='answerForm' type='text' placeholder='Enter Answer here'></input>
        </form>
        <button onClick={() => this.checkAnswer(document.getElementById('answerForm').value)}>Lezz Fite</button>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));