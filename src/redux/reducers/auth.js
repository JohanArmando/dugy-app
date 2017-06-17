initial = {
  name: '',
  last_name: '',
  email: '',
  avatar: {
    thumbnail: ''
  }
};

const auth = (state = initial, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.user
    case 'LOGOUT':
      return { name: '', avatar: { thumbnail: ''} }
    case 'EDITPROFILE':
      return action.user
    default:
      return state
  }
}

export default auth
