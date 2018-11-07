import React from 'react';
import { connect } from 'react-redux';
import {Map,Marker,TileLayer} from 'react-leaflet'
import Preview from './preview_container'
import NewLocationModal from './modal_new_location'
import L from 'leaflet';
import {fetchLocations,selectLocation} from '../actions'






class MapContainer extends React.Component {
  componentDidMount() {
    this.props.fetchLocations()
  }

  renderMarkers = () => {
    const icon = L.icon({
      iconUrl: require('../images/coffee-cup-vector.png'),
      iconSize: [70,70]
    })

    const markerArray = this.props.locations.map((location) => {

      return (
        <Marker position={[location.lat,location.lng]} key={location.id} onClick={() => this.props.selectLocation(location.id)}>
        </Marker>
      )
    })
    return markerArray
  }


  render() {
    const position = [40.710438, -73.956886]
    return (
              <div id="discover">
                <div id="mapid">
                  <Map center={position} zoom={13}>
                    <TileLayer
                    url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
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
  }
}

export default connect(mapStateToProps, {fetchLocations,selectLocation})(MapContainer)
