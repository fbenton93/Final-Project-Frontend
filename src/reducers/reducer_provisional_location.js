export default function(state = {},action) {
  switch(action.type) {
    case 'LOCATION_ADDED':
      return action.payload
    case 'NEW_REVIEW':
      return action.payload
    default:
      return state
  }
}
