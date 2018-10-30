import React from 'react';
import { Modal, Button } from 'semantic-ui-react'

export default class Preview extends React.Component {
  render() {
    return (
      <div id="preview">
        <Modal trigger={<Button>Review This Shop</Button>}>
          <Modal.Header>Write a Review</Modal.Header>
        </Modal>

      </div>
    )
  }
}
