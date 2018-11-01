export default function(state = {},action) {
  switch(action.type) {
    case 'SELECT_LOCATION':
      return action.payload
    default:
      return state
  }
}
