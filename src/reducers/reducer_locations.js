export default function(state = [],action) {
  switch(action.type) {
    case 'LOCATIONS_LOADED':
      return action.payload
    case 'POST_NEW_LOCATION_COMPLETE':
      return [...state,action.payload]
    default:
      return state
  }
}
