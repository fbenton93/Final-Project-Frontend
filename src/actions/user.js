import axios from 'axios';

const baseURL = 'http://localhost:3001/api/v1'


// will run on every mount; collects the users current location. This is used
// to set the map center and to load a location for posting new locations
export function setUserCoords(lat,lng) {
  const coords = {lat,lng}
  return (dispatch) => {
    dispatch({type: 'LOCATION_ACQUIRED', payload: coords})
    return axios.post(`${baseURL}/first-five`, { location: {...coords}})
    .then(response => {
      return dispatch({type: 'FIRST_FIVE', payload: response.data.locations})
    })
  }
}


// posts a user to the backend and sets them as the currentUser in the front end
export function postNewUser(userData) {
  const user = {user: {...userData}}
  return (dispatch) => {
    dispatch({type: 'LOADING_CURRENT_USER'});
    return axios.post(`${baseURL}/users`,user)
    .then(currentUser => {
      localStorage.setItem('jwt',currentUser.data.jwt)
      dispatch({type: 'LOGIN_NEW_USER', payload: currentUser})
    })
  }
}

// posts to an auth route that returns a token and sets the currentUser in the
// front end
export function loginUser(credentials) {
  const user = {user: {...credentials}}
  return (dispatch) => {
    dispatch({type: 'LOADING_NEW_USER'});
    return axios.post(`${baseURL}/login`, user)
    .then(currentUser => {
      localStorage.setItem('jwt',currentUser.data.jwt)
      dispatch({type: 'LOGINUSER', payload: currentUser})
    })
  }
}

// uses the jwt token to set the currentUser on refresh or a revisit to the page
export function fetchCurrentUser() {
  return (dispatch) => {
    axios.get(`${baseURL}/profile`, { headers: {'Authorization': `Bearer ${localStorage.getItem('jwt')}`}})
    .then(currentUser => {
      dispatch({type: 'LOGINUSER', payload: currentUser})
    })
  }
}

// destroys token and clears currentUser
export function logoutUser() {
  return (dispatch) => {
    localStorage.removeItem('jwt')
    dispatch({type: 'LOGOUT_USER'})
  }
}


// sends a patch to set new user preferences
export function updateUserPrefs(values,userId) {
  return (dispatch) => {
    axios.patch(`${baseURL}/users/${userId}`, {user: {...values}}, {headers: {'Authorization': `Bearer ${localStorage.getItem('jwt')}`}})
    .then(updatedUser => {
      dispatch({type: 'UPDATED_USER', payload: updatedUser})
    })
  }
}
