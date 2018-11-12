const defaultPosition = [40.710438, -73.956886]

export default function(state = defaultPosition,action) {

  switch(action.type) {
    case 'LOCATION_ACQUIRED':
      return action.payload
    default:
      return defaultPosition
  }
}
