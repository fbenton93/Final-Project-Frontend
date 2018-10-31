// import an action case here if you wa to store type in a variable.

export default function(state = {name: ''},action) {
  switch(action.type) {
    case 'LOGINNEWUSER':
      return action.payload
  }

  return state;
}
