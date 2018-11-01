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

export function postNewUser(userData,cb) {
  const user = {user: {...userData}}
  return (dispatch) => {
    dispatch({type: 'LOADING_CURRENT_USER'});
    return axios.post('http://localhost:3001/api/v1/users',user)
    .then(currentUser => dispatch({type: 'LOGINNEWUSER', payload: currentUser}))
    .then(() => cb())
  }

}

export function loginUser(credentials,cb) {
  const user = {user: {...credentials}}
  const current_user = axios.post('http://localhost:3001/api/v1/login')

  return {
    type: 'LOGINUSER',
    payload: user
  }
}
