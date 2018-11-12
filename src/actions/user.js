import axios from 'axios';

export function postNewUser(userData) {
  const user = {user: {...userData}}
  return (dispatch) => {
    dispatch({type: 'LOADING_CURRENT_USER'});
    return axios.post('http://localhost:3001/api/v1/users',user)
    .then(currentUser => {
      localStorage.setItem('jwt',currentUser.data.jwt)
      dispatch({type: 'LOGIN_NEW_USER', payload: currentUser})
    })
  }
}

export function loginUser(credentials) {
  const user = {user: {...credentials}}
  return (dispatch) => {
    dispatch({type: 'LOADING_NEW_USER'});
    dispatch({type: 'AUTHENTICATING_USER'})
    return axios.post('http://localhost:3001/api/v1/login', user)
    .then(currentUser => {
      localStorage.setItem('jwt',currentUser.data.jwt)
      dispatch({type: 'LOGINUSER', payload: currentUser})
    })
    .then(() => dispatch({type: 'AUTHENTICATED_USER'}))
  }
}

export function fetchCurrentUser() {
  return (dispatch) => {
    dispatch({type: 'AUTHENTICATING_USER'})
    axios.get('http://localhost:3001/api/v1/profile', { headers: {'Authorization': `Bearer ${localStorage.getItem('jwt')}`}})
    .then(currentUser => {
      dispatch({type: 'LOGINUSER', payload: currentUser})
    })
  }
}

export function logoutUser() {
  return (dispatch) => {
    localStorage.removeItem('jwt')
    dispatch({type: 'LOGOUT_USER'})
  }
}

export function updateUserPrefs(values,userId) {
  return (dispatch) => {
    axios.patch(`http://localhost:3001/api/v1/users/${userId}`, {user: {...values}}, {headers: {'Authorization': `Bearer ${localStorage.getItem('jwt')}`}})
    .then(updatedUser => console.log(updatedUser))
  }
}
