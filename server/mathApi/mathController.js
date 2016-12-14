const axios = require('axios');
const bodyParser = require('body-parser');

module.exports = {

  //generate a math problem when you load the age
  generateQuestion: (req, res) => {

    const userlvl = req.body.level;
    const operands = ['+', '-', '*', '/'];
    const firstDigit = Math.floor(Math.random() * Math.pow(10, userlvl));
    const secondDigit = Math.floor(Math.random() * Math.pow(10, userlvl));
    const operandIndex = Math.floor(Math.random() * 2);

    const answer = eval(firstDigit + operands[operandIndex] + secondDigit);


    //   generateQuestion() {

//     const userlvl = this.props.userlvl;
//     const operands = ['+', '-', '*', '/'];
//     const firstDigit = Math.floor(Math.random() * Math.pow(10, userlvl));
//     const secondDigit = Math.floor(Math.random() * Math.pow(10, userlvl));
//     const operandIndex = Math.floor(Math.random() * 2);

//     const answer = eval(firstDigit + operands[operandIndex] + secondDigit);

//     this.setState({
//       answer: answer
//     });

//     this.setState({
//       question: firstDigit + ' ' + operands[operandIndex] + ' ' + secondDigit + ' = '
//     });

//     const operand;

//     if (operands[operandIndex] === '+') {
//       operand = 'addition';
//     } else if (operands[operandIndex] === '-') {
//       operand = 'subtraction';
//     } else if (operands[operandIndex] === '*') {
//       operand = 'multiplcation';
//     } else if (operands[operandIndex] === '/') {
//       operand = 'division';
//     }

//     this.setState({
//       operand: operand
//     });
//   }

//   checkAnswer(answer) {
//     const context = this;
//     if (answer === '' + this.state.answer) {
//       const newCorrect = Object.assign({}, context.props.correctAnswers);
//       newCorrect[context.state.operand]++;
//       context.props.dispatch(setCorrect(newCorrect));

//       this.attack();
//       const user = document.getElementById('userContainer');
//       // user.style.animation = 'attack2 1000ms paused';

//       this.checkHealth();
//       this.generateQuestion();
//       //this.resetTimer();

//     } else {
//       const newIncorrect = Object.assign({}, context.props.incorrectAnswers);
//       newIncorrect[context.state.operand]++;
//       context.props.dispatch(setIncorrect(newIncorrect));

//       this.miss();
//       const opponent = document.getElementById('opponentContainer');
//       // opponent.style.animation = 'attack 1000ms paused';

//       this.checkHealth();
//       this.generateQuestion();
//       //this.resetTimer();
//     }
//     document.getElementById('answerForm')
// }

  }
}

