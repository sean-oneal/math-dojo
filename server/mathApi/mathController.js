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


  }
}

