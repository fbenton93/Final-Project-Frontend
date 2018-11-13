import React from 'react';
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

  fetchAddress = (e) => {
    e.preventDefault()

    this.reverseCoordinates(this.props.userCoords)
  }

  handleClick = () => {
    this.props.locationAdded(this.state)
  }

  reverseCoordinates = (coords) => {
    let latLng = new window.google.maps.LatLng(coords.lat,coords.lng);
    const geoCoder = new window.google.maps.Geocoder();
    geoCoder.geocode({latLng}, (results,status) => {
      if (status !== window.google.maps.GeocoderStatus.OK) {
        alert(status)
      } else {
        let rawAddress = results[0].formatted_address
        let lineOneComma = rawAddress.indexOf(',')
        let lineTwoComma = rawAddress.lastIndexOf(',')
        let lineOne = rawAddress.slice(0,lineOneComma)
        let lineTwo = rawAddress.slice(lineOneComma + 2,lineTwoComma)
        this.setState({
          lineOne,
          lineTwo
        })
      }
    })
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
          <Grid.Column width={16}>
            <Segment>
              <Button style={{height: '100%', width: '100%'}} onClick={this.fetchAddress}>Guess My Location</Button>
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
          <Grid.Column width={8}>
            <Button className={this.enabled() ? "blue" : "disabled"} onClick={this.handleClick}>{message}</Button>
          </Grid.Column>
        </Grid>
      </form>
    )

  }
}

function mapStateToProps(state) {
  return {
    userCoords: state.userCoords
  }
}





export default connect(mapStateToProps,{locationAdded,postNewLocation})(NewLocationForm)
