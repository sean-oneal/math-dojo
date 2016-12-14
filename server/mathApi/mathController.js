const Axios = require('axios');
const bodyParser = require('body-parser');

module.exports = {

  //generate a math problem when you load the page
  generateQuestion: (req, res) => {
    console.log('BODYYYYYYY', req.body);
    const userlvl = req.body.level; //***
    const operands = ['+', '-', '*', '/'];
    const firstDigit = Math.floor(Math.random() * Math.pow(10, userlvl));
    const secondDigit = Math.floor(Math.random() * Math.pow(10, userlvl));
    const operandIndex = Math.floor(Math.random() * 2);

    const answer = eval(firstDigit + operands[operandIndex] + secondDigit);

    const question = firstDigit + ' ' + operands[operandIndex] + ' ' + secondDigit + ' = ';

    const operand;

    if (operands[operandIndex] === '+') {
      operand = 'addition';
    } else if (operands[operandIndex] === '-') {
      operand = 'subtraction';
    } else if (operands[operandIndex] === '*') {
      operand = 'multiplcation';
    } else if (operands[operandIndex] === '/') {
      operand = 'division';
    }

    //send back anwser, quest, oprand (respectively)
    res.status(200).send({
      answer: answer, 
      question: question,
      operand: operand 
    });
  }

  // checkAnswer: (req, res) => {
  //   // console.log('CHECK ANSWER BODY', req);
  // }

}

