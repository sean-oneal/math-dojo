const user = (state = {}, action) => {
  console.log('reducer:' + JSON.stringify(action));
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        username: action.user.username,
        classroom: action.user.classroom,
        students: action.user.students,
      };
    case 'SET_STUDENT':
      return {
        ...state,
        studentUsername: action.student.studentUsername,
        studentPassword: action.student.studentPassword,
        classroom: action.student.classroom,
        level: action.student.level,
      };
    case 'SET_CORRECT':
      return {
        ...state,
        userCorrectAnswers: action.correctAnswers,
      };
    case 'SET_INCORRECT':
      console.log(action);
      return {
        ...state,
        userIncorrectAnswers: action.incorrectAnswers,
      };
    default:
      return state;
  }
}

export default user;
