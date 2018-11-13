export default function(state = false, action) {
  switch(action.type) {
    case 'LOCATION_ADDED':
      return true
    case 'LOCATION_REMOVED':
      return false
    default:
      return state
  }
}
