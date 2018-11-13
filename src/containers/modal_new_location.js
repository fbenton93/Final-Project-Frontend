import React from 'react';
import NewLocationContainer from './new_location_container'
import { Modal, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { locationRemoved } from '../actions'

class NewLocationModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  closeModal = (e) => {
    this.setState({
      open: false
    })
    this.props.locationRemoved()
  }

  render() {
    return (
      <Modal open={this.state.open} trigger={<Button id="new-location-button" onClick={() => this.setState({open: true})}>Add a New Location</Button>}>
        <Modal.Header>Add a New Location! <Button style={{marginLeft: "65%"}} color="red" type="button" onClick={this.closeModal}>Cancel</Button></Modal.Header>
        <Modal.Content>
          <NewLocationContainer closeModal={this.closeModal} />
        </Modal.Content>
      </Modal>
    )
  }
}

export default connect(null,{locationRemoved})(NewLocationModal)
