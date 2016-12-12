const user = (state = {}, action) => {
  console.log(action);
  switch (action.type) {
    case 'SET_USER':
      return {
        username: action.user.username,
        userlvl: action.user.userlvl,
        userAvatar: action.user.userAvatar,
      };
    default: 
      return state;
  }
}

export default user;