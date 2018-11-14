import axios from 'axios';
import _ from 'lodash';
export * from './user'
// axios can be used to run requests.
// with 'redux-promise', we stall action dispatching untill promsies are fulfilled

const mapsKey = process.env.REACT_APP_GOOGLE_MAPS_KEY
const cloudKey = process.env.REACT_APP_CLOUDINARY_URL
const baseURL = 'http://localhost:3001/api/v1'


// pulls all locations from API
export function fetchLocations() {
  return (dispatch) => {
    return axios.get(`${baseURL}/locations`)
    .then(response => {
      dispatch({type: 'LOCATIONS_LOADED',payload: response.data.locations})
    })
  }
}


// pulls a single location selected off of the map via a marker-click
export function selectLocation(id) {
  return (dispatch) => {
    return axios.get(`${baseURL}/locations/${id}`)
    .then(response => {
      dispatch({type: 'SELECT_LOCATION',payload: response.data})
    })
  }
}

// posts a new location to the backend; receives the new location; posts the first review for that location.
// a location can't be posted without a review
export function postNewLocation(values,userId,provisionalLocation) {
  const formattedQuery = `${provisionalLocation.lineOne.split(' ').join('+')}, +${provisionalLocation.lineTwo.split(' ').join('+')}`
  return (dispatch) => {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${formattedQuery}&key=${mapsKey}`)
    .then(response => {
      const geo = response.data.results[0].geometry.location
      return axios.post(`${baseURL}/locations`, {location: {...provisionalLocation, lat: geo.lat, lng: geo.lng}})
      .then(newLocation => {
        return axios.post(`${baseURL}/reviews`, {review: {...values, location_id: newLocation.data.id, user_id: userId}})
        .then(response => {
          dispatch({type: 'REVIEW_RECEIVED', payload: response.data })
          return axios.get(`${baseURL}/locations`)
          .then(response => {
            dispatch({type: 'LOCATIONS_LOADED',payload: response.data.locations})
          })
        })
      })
    })
  }
}

// posts a users review; saves updates the selectedLocations reviews
export function postNewReview(values,userId,locationId) {
  const reviewObj = {review: {...values,user_id: userId, location_id: locationId}}
  return (dispatch) => {
    axios.post(`${baseURL}/reviews`,reviewObj)
    .then(response => {
      dispatch({type: 'REVIEW_RECEIVED', payload: response.data })
      dispatch(selectLocation(locationId)) // does this work?
      axios.get(`${baseURL}/locations`)
      .then(response => {
        dispatch({
          type: 'LOCATIONS_LOADED',
          payload: response.data.locations
        })

      })
    })
  }
}

// loads the name and address of a new location for submission with postNewLocation
export function locationAdded(locationValues) {
  return {
    type: 'LOCATION_ADDED',
    payload: locationValues
  }
}

// clears the name and address of a new location if the user exits the form prematurely
export function locationRemoved() {
  return {
    type: 'LOCATION_REMOVED'
  }
}

// sets a location to be reviewed.
export function setProvisionalLocation(location) {
  return ({
    type: 'NEW_REVIEW',
    payload: location
  })
}
