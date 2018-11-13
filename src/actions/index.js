import axios from 'axios';
import _ from 'lodash';
export * from './user'
// axios can be used to run requests.
// with 'redux-promise', we stall action dispatching untill promsies are fulfilled

const mapsKey = process.env.REACT_APP_GOOGLE_MAPS_KEY
const cloudKey = process.env.REACT_APP_CLOUDINARY_URL









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
      return axios.post('http://localhost:3001/api/v1/locations', {location: {...provisionalLocation, lat: geo.lat, lng: geo.lng}})
      .then(newLocation => {
        return axios.post('http://localhost:3001/api/v1/reviews', {review: {...values, location_id: newLocation.data.id, user_id: userId}})
        .then(response => {
          dispatch({type: 'REVIEW_RECEIVED', payload: response.data })
          return axios.get('http://localhost:3001/api/v1/locations')
          .then(response => {
            dispatch({type: 'LOCATIONS_LOADED',payload: response.data.locations})
          })
        })
      })
    })
  }
}

export function postNewReview(values,userId,locationId) {
  const reviewObj = {review: {...values,user_id: userId, location_id: locationId}}
  return (dispatch) => {
    axios.post('http://localhost:3001/api/v1/reviews',reviewObj)
    .then(response => {
      dispatch({type: 'REVIEW_RECEIVED', payload: response.data })
      selectLocation(locationId)
      axios.get('http://localhost:3001/api/v1/locations')
      .then(response => {
        dispatch({
          type: 'LOCATIONS_LOADED',
          payload: response.data.locations
        })

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

export function locationRemoved() {
  return {
    type: 'LOCATION_REMOVED'
  }
}

export function setProvisionalLocation(location) {
  return ({
    type: 'NEW_REVIEW',
    payload: location
  })
}
