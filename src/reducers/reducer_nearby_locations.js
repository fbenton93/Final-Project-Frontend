
export default function(state = [],action) {
  switch(action.type) {
    case 'FIRST_FIVE':
      return action.payload
    default: 
      return state
  }
}
