// import an action case here if you wa to store type in a variable.

const defaultState = {jwt: '', user: {username: 'Login'}}

export default function(state = defaultState,action) {
  switch(action.type) {
    case 'LOGIN_NEW_USER':
      return action.payload.data
    case 'LOGINUSER':
      return action.payload.data
    case 'LOGOUT_USER':
      return defaultState
    case 'UPDATED_USER':
      return {user: action.payload.data.user, reviews: state.reviews}
    default:
      return state
  }
}
