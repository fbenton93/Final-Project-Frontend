import axios from 'axios';
// axios can be used to run requests.
// with 'redux-promise', we stall action dispatching untill promsies are fulfilled


export function genericAction({ data }) {
  // here you can make manipulations to the data that's being received.
  console.log(data)
  return {
    type: 'GENERIC',
    payload: data
  }
}
