import React from 'react';
import NewLocationContainer from './new_location_container'
import { Modal, Button } from 'semantic-ui-react'

export default class NewLocationModal extends React.Component {
  render() {
    return (
      <Modal trigger={<Button id="new-location-button">Add a New Location</Button>}>
        <Modal.Header>Add a New Location!</Modal.Header>
        <Modal.Content>
          <NewLocationContainer />
        </Modal.Content>
      </Modal>
    )
  }
}
