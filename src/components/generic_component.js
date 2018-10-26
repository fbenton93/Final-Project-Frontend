// import React from 'react';

// export default class GenericComponent extends React.Component {
//   render() {
//     return <iframe id="iframe" src="https://www.cnn.com/" />
//   }
// }


import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

const ModalModalExample = () => (
  <Modal trigger={<Button>Show Modal</Button>}>
    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content image>
      <iframe wrapped size='medium' src='https://www.cnn.com/2018/10/26/us/washington-hanford-vitrification-plant-alert/index.html' />
      <Modal.Description>
        <Header>Default Profile Image</Header>
        <p>We've found the following gravatar image associated with your e-mail address.</p>
        <p>Is it okay to use this photo?</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default ModalModalExample
