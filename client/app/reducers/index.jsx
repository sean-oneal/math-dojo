const user = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        username: action.user.username,
        userlvl: action.user.userlvl,
        userAvatar: action.user.userAvatar,
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