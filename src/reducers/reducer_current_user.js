// import an action case here if you wa to store type in a variable.

const defaultState = {jwt: '', user: {username: 'Login'}}

export default function(state = defaultState,action) {
  switch(action.type) {
    case 'LOGINNEWUSER':
      return action.payload.data
    case 'LOGINUSER':
      return action.payload.data
    case 'LOGOUT_USER':
      return defaultState
    default:
      return state
  }
}
