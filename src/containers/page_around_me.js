import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import { Loader, Grid, Segment } from 'semantic-ui-react'
import { linkifyGoogle } from '../helpers'
import _ from 'lodash'

class AroundMe extends Component {
  constructor(props) {
    super(props)
  }

  renderCards = () => {

    return this.props.nearbyLocations.map((location) => {
      const link = linkifyGoogle(location.location.address_line_1,location.location.address_line_2)
      return (
        <Grid.Column id="five-grid" width={10}>
          <Segment>
            <img src={location.img} id="five-img" />
            <div id="five-details">
              <h3 id="five-name">{location.location.name}</h3>
              <p id="five-address">{location.location.address_line_1} | {location.location.address_line_2}</p>
              <p id="five-distance">{Math.round(100 * location.distance)/100} miles</p>
              <a href={link} target="_blank">Get Directions</a>
            </div>

          </Segment>
        </Grid.Column>
      )
    })
  }

  render() {
    console.log(this.props.nearbyLocations)
    const {nearbyLocations} = this.props
    return nearbyLocations.length < 1 ? <Redirect to="/" /> : (
      <div id="around-me-page">
        <Grid>
          {this.renderCards()}
        </Grid>
      </div>
    )

  }
}

function mapStateToProps(state) {
  return {
    nearbyLocations: state.nearbyLocations
  }
}

export default connect(mapStateToProps)(AroundMe)
