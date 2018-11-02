import React from 'react';
import ReviewModal from './modal_review'
import DetailsModal from './modal_details'
import PreviewInfo from '../components/preview_component'
import {connect} from 'react-redux'


class Preview extends React.Component {

  render() {
    const { selectedLocation } = this.props
    const image_src = selectedLocation.reviews ? selectedLocation.reviews[0].img_url : ""
    console.log(selectedLocation)
    return (
      <div id="preview">
        <div id="preview-img">
          {selectedLocation.name ? <img src={image_src} /> : <h2>Explore Cafes By Selecting Markers</h2>}
        </div>
        <div id="preview-short">
          {selectedLocation.name ? <PreviewInfo name={selectedLocation.name} review={selectedLocation.reviews.slice(-1)[0]} /> : ""}
        </div>
        <ReviewModal />
        <DetailsModal />
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
