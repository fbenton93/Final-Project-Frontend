import React from 'react';
import ReviewForm from './form_review'
import { Modal, Button } from 'semantic-ui-react'

export default class DetailsModal extends React.Component {
  render() {
    return (
      <Modal trigger={<Button id="details-button">Analysis</Button>}>
        <Modal.Header>Location Name</Modal.Header>
        <Modal.Content>Flex Div With All Images</Modal.Content>
        <Modal.Content>ChartJS Analysis</Modal.Content>
      </Modal>
    )
  }
}
