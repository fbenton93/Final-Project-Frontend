// import an action case here if you wa to store type in a variable.

export default function(state = {name: '', value: 0},action) {
  switch(action.type) {
    case 'GENERIC':
      return action.payload
  }

  return state;
}
