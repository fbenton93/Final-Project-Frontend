export default function(state = [],action) {
  switch(action.type) {
    case 'LOCATIONS_LOADED':
      return action.payload
    default:
      return state
  }
}
