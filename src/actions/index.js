import axios from 'axios';
import _ from 'lodash';
// axios can be used to run requests.
// with 'redux-promise', we stall action dispatching untill promsies are fulfilled

const mapsKey = process.env.REACT_APP_GOOGLE_MAPS_KEY
const cloudKey = process.env.REACT_APP_CLOUDINARY_KEY



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
  return (dispatch) => {
    dispatch({type: 'LOADING_NEW_USER'});
    return axios.post('http://localhost:3001/api/v1/login', user)
    .then(currentUser => dispatch({type: 'LOGINUSER', payload: currentUser}))
    .then(() => cb())
  }
}

export function fetchLocations() {
  return (dispatch) => {
    return axios.get('http://localhost:3001/api/v1/locations')
    .then(response => {
      dispatch({type: 'LOCATIONS_LOADED',payload: response.data.locations})
    })
  }
}

export function selectLocation(id) {
  return (dispatch) => {
    return axios.get(`http://localhost:3001/api/v1/locations/${id}`)
    .then(response => {
      dispatch({type: 'SELECT_LOCATION',payload: response.data})
    })
  }
}

export function postNewLocation(values,userId,provisionalLocation) {
  const formattedQuery = `${provisionalLocation.lineOne.split(' ').join('+')}, +${provisionalLocation.lineTwo.split(' ').join('+')}`

  return (dispatch) => {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${formattedQuery}&key=${mapsKey}`)
    .then(response => {
      const geo = response.data.results[0].geometry.location
      return axios.post('http://localhost:3001/api/v1/locations', {...provisionalLocation, lat: geo.lat, lng: geo.lng})
      .then(newLocation => {
        dispatch({type: 'POST_NEW_LOCATION_COMPLETE', payload: newLocation })
        return axios.post('http://localhost:3001/api/v1/reviews', {...values, location_id: newLocation.id, user_id: userId})
      })
    })
  }
}



export function locationAdded(locationValues) {
  return {
    type: 'LOCATION_ADDED',
    payload: locationValues
  }
}

export function formReset() {
  return {
    type: 'FORM_RESET',
  }
}
