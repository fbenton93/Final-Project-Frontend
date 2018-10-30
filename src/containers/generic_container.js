import React from 'react';
import { connect } from 'react-redux';
import {Map,Marker,Popup,TileLayer} from 'react-leaflet'
import Preview from './preview_container'
import cup from '../images/coffee-cup-vector.png';
import L from 'leaflet';





class GenericContainer extends React.Component {
  render() {
    const icon = L.icon({
      iconUrl: require('../images/coffee-cup-vector.png'),
      iconSize: [70,70]
    })
    const position = [40.710438, -73.956886]
    const map = (
      <Map center={position} zoom={13}>
        <TileLayer
        url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker position={position} icon={icon}>
          <Popup>A pretty CSS3 popup.</Popup>
        </Marker>
      </Map>
    )
    return (
            <div id="discover">
              <div id="mapid">{map}</div>
              <Preview />
            </div>
          )
  }
}

function mapStateToProps(state) {
  return {
    genericProp: state.generic
  }
}

export default connect(mapStateToProps)(GenericContainer)
