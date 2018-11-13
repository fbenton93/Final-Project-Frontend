export default function(state = {},action) {
  switch(action.type) {
    case 'SELECT_LOCATION':
      return action.payload
    case 'REVIEW_RECEIVED':
      return {...state, reviews: [action.payload,...state.reviews]}
    default:
      return state
  }
}
