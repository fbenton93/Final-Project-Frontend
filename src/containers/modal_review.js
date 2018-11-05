import React from 'react';
import NewLocationContainer from './new_location_container'
import { Modal, Button } from 'semantic-ui-react'

export default class ReviewModal extends React.Component {
  render() {
    return (
      <Modal trigger={<Button id="review-button">Review This Shop</Button>}>
        <Modal.Header>Write a Review</Modal.Header>
        <Modal.Content>
          <p>Under Construction</p>
        </Modal.Content>
      </Modal>
    )
  }
}
