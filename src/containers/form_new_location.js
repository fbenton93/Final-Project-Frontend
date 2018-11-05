import React from 'react';
import {Field,reduxForm} from 'redux-form'
import { connect } from 'react-redux'
import {Segment,Grid,Button,Input} from 'semantic-ui-react'
import { locationAdded } from '../actions'
import { postNewLocation } from '../actions'

class NewLocationForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      lineOne: '',
      lineTwo: ''
    }
  }

  enabled = () => {
    if (this.state.name.length > 5 && this.state.lineOne.length > 5 && this.state.lineTwo.length > 5) {
      return true
    } else {
      return false
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })

  }

  handleClick = () => {
    this.props.locationAdded(this.state)
  }

  render() {
    const message = this.enabled() ? "Next" : "Fill Out the Form Above Before Proceeding.."
    return (
      <form>
        <Grid padded>
          <Grid.Column width={16}>
            <Segment>
              <h3>Enter Shop Name (i.e. "Midtown Cafe")</h3>
              <Input name="name" value={this.state.name} onChange={this.handleChange}></Input>
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>
              <h3>Enter Street Address (i.e. 137 E 47th St.)</h3>
              <Input name="lineOne" value={this.state.lineOne} onChange={this.handleChange}></Input>
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>
              <h3>Enter City/State/ZIP</h3>
              <Input name="lineTwo" value={this.state.lineTwo} onChange={this.handleChange}></Input>
            </Segment>
          </Grid.Column>
        </Grid>
        <Button className={this.enabled() ? "blue" : "disabled"} onClick={this.handleClick}>{message}</Button>
      </form>
    )

  }
}

function validate(values) {
  const errors = {}
  return errors
}

export default reduxForm({
  validate: validate,
  form: "NewLocationForm"
})(
  connect(null,{locationAdded,postNewLocation})(NewLocationForm)
)
