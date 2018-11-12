import axios from 'axios';

export function setUserCoords(lat,lng) {
    const coords = {lat,lng}
    return { type: 'LOCATION_ACQUIRED',
          payload: coords
        }
}

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
    return axios.post('http://localhost:3001/api/v1/login', user)
    .then(currentUser => {
      localStorage.setItem('jwt',currentUser.data.jwt)
      dispatch({type: 'LOGINUSER', payload: currentUser})
    })
  }
}

export function fetchCurrentUser() {
  return (dispatch) => {
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
    .then(updatedUser => {
      dispatch({type: 'UPDATED_USER', payload: updatedUser})
    })
  }
}
