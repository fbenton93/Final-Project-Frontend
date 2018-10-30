import axios from 'axios';
// axios can be used to run requests.
// with 'redux-promise', we stall action dispatching untill promsies are fulfilled

const key = process.env.REACT_APP_GOOGLE_MAPS_KEY
export function genericAction({ data }) {
  // here you can make manipulations to the data that's being received.

  return {
    type: 'GENERIC',
    payload: data
  }
}
