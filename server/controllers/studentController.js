var Student = require('./../models/studentModel.js');
var Teacher = require('./../models/teacherModel.js');
var util = require('./../config/utility.js');

exports.loginStudent = function (req, res) {
  Student.findOne({username: req.body.username, classroom: req.body.classroom }, function(err, student) {
    if (err) {
      res.status(500);
      res.send({ error: 'Error retrieving student record' });
    } else if (!student || req.body.password !== student.password ) {
      res.status(401);
      res.send({ error: 'Invalid username or password' });
    } else {
      util.createSession(req, res, student);
      res.send(student);
    }
  });
};

exports.logoutStudent = function (req, res) {
  Student.findOne({username: req.body.username, classroom: req.body.classroom }, function(err, student) {
    if (err) {
      res.status(500);
      res.send({ error: 'Error retrieving student record' });
    } else if (!student) {
      res.status(401);
      res.send({ error: 'Student Record not Found' });
    } else {
      student.score = req.body.score;
      student.level = req.body.level;
      student.correctAnswers = req.body.correctAnswers;
      student.incorrectAnswers = req.body.incorrectAnswers;
      student.save(function(err){
        if (err) {
          res.status(500);
          res.send({ error: 'Error retrieving student record' });
        } else {
          req.session.destroy();
          res.send();
        }
      });
    }
  });
};

exports.generateQuestion = function (req, res) {
  let userlvl = parseInt(req.body.userlvl);

  console.log('######', typeof req.cookies.userlvl);
  const operands = ['+', '-', '*', '/'];
  const firstDigit = Math.floor(Math.random() * Math.pow(5, userlvl));
  const secondDigit = Math.floor(Math.random() * Math.pow(5, userlvl));
  const operandIndex = Math.floor(Math.random() * 2);

  const answer = eval(firstDigit + operands[operandIndex] + secondDigit);

  const question = firstDigit + ' ' + operands[operandIndex] + ' ' + secondDigit + ' = ';

  let operand;

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
};

exports.getClassrooms = function (req, res) {
  Teacher.find( function(err, teachers) {
    if (err) {
      res.status(500);
      res.send({ error: 'Error retrieving classrooms' });
    } else {
      var classrooms = [];
      teachers.forEach( function(teacher) {
        classrooms.push(teacher.classroom);
      });
      res.send(classrooms);
    }
  });
};
