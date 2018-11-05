import React from 'react';
import ReviewModal from './modal_review'
import DetailsModal from './modal_details'
import PreviewInfo from '../components/preview_component'
import {connect} from 'react-redux'


class Preview extends React.Component {

  render() {
    const { selectedLocation } = this.props
    const image_src = selectedLocation.reviews ? selectedLocation.reviews[0].img_url : ""
    return (
      <div id="preview">
        <div id="preview-img">
          {selectedLocation.name ? <img src={image_src} /> : <h2>Explore Cafes By Selecting Markers</h2>}
        </div>
        <div id="preview-short">
          {selectedLocation.name ? <PreviewInfo selectedLocation={selectedLocation} /> : ""}
        </div>
        {selectedLocation.reviews ? <><ReviewModal /><DetailsModal name={selectedLocation.name} radar1={selectedLocation.averages} radar2={selectedLocation.regional_avg} reviews={selectedLocation.reviews} traffic={selectedLocation.traffic}/></> : null }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedLocation: state.selectedLocation
  }
}

export default connect(mapStateToProps)(Preview)
