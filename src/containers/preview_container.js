import React from 'react';
import ReviewModal from './modal_review'
import DetailsModal from './modal_details'


export default class Preview extends React.Component {
  render() {

    return (
      <div id="preview">
        <ReviewModal />
        <DetailsModal />
      </div>
    )
  }
}
