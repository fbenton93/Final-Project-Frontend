import React from 'react';
import NewLocationContainer from './new_location_container'
import { Modal, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setProvisionalLocation } from '../actions'
import ReviewForm from './form_review'
import FormSuccess from '../components/form_success_graphic'

class ReviewModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submitted: false
    }
  }

  reRenderModal = () => {
    this.setState({
      submitted: true
    })
  }

  setProvisionalLocation = () => {
    this.props.setProvisionalLocation(this.props.selectedLocation)
  }

  render() {
    return (
      <Modal trigger={<Button id="review-button" onClick={this.setProvisionalLocation}>Review This Shop</Button>}>
        <Modal.Header>Write a Review</Modal.Header>
        <Modal.Content>
          {this.state.submitted ? <FormSuccess /> : <ReviewForm reRenderModal={this.reRenderModal} /> }
        </Modal.Content>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return({
    selectedLocation: state.selectedLocation
  })
}

export default connect(mapStateToProps,{setProvisionalLocation})(ReviewModal)
