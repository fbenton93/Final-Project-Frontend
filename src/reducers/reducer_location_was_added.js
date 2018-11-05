export default function(state = false, action) {
  switch(action.type) {
    case 'LOCATION_ADDED':
      return true
    default:
      return state
  }
}
