export default function(state = false,action) {
  switch(action.type) {
    case 'AUTHENTICATING_USER':
      return true
    case 'AUTHENTICATED_USER':
      return false
    default:
      return state
  }
}
