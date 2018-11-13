export default function(state = true, action) {
  switch(action.type) {
    case 'USER_VALID':
      return true
    case 'USER_INVALID':
      return false
    default:
      return state
  }

}
