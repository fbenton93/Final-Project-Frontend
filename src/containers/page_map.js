import React from 'react';
import { connect } from 'react-redux';
import {Map,Marker,TileLayer,Popup} from 'react-leaflet'
import Preview from './preview_container'
import NewLocationModal from './modal_new_location'
import L from 'leaflet';
import {fetchLocations,selectLocation} from '../actions'

import reqAuth from '../HOC/wrapper_auth'






class MapContainer extends React.Component {
  componentDidMount() {
    this.props.fetchLocations()
  }

  renderMarkers = () => {
    const markerArray = this.props.locations.map((location) => {

      return (
        <Marker position={[location.lat,location.lng]} key={location.id} onClick={() => this.props.selectLocation(location.id)}>
        </Marker>
      )
    })
    return markerArray
  }


  render() {
    const position = this.props.userCoords
    const locationIcon = new L.Icon({
      iconUrl: require('../images/star-raster.png'),
      iconSize: [320,220]
    })
    return (
              <div id="discover">
                <div id="mapid">
                  <Map center={position} zoom={13}>
                    <TileLayer
                    url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    <Marker position={position} icon={locationIcon}><Popup>You are here.</Popup></Marker>
                    {this.renderMarkers()}
                  </Map>
                  <NewLocationModal />
                </div>
                <Preview />
              </div>
          )
  }
}

function mapStateToProps(state) {
  return {
    locations: state.locations,
    userCoords: state.userCoords
  }
}

export default reqAuth(connect(mapStateToProps, {fetchLocations,selectLocation})(MapContainer))
