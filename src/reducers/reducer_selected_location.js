export default function(state = {selected: false},action) {
  switch(action.type) {
    case 'SELECT_LOCATION':
      return action.payload
    case 'REVIEW_RECEIVED':
      return {...state, reviews: [action.payload,...state.reviews]}
    default:
      return state
  }
}
