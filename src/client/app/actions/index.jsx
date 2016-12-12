export const setUser = (user) => {
  return {
    type: 'SET_USER',
    user,
  }
}

export const setCorrect = (correctAnswers) => {
  return {
    type: 'SET_CORRECT',
    correctAnswers,
  }
}

export const setIncorrect = (incorrectAnswers) => {
  return {
    type: 'SET_INCORRECT',
    incorrectAnswers,
  }
}

