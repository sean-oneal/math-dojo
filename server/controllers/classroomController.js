var Teacher = require('./../models/teacherModel.js');
var util = require('./../config/utility.js');

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
