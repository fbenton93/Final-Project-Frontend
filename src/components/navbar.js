import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { NavLink, withRouter } from 'react-router-dom';
import { logoutUser } from '../actions/user'
import { connect } from 'react-redux';



class NavBar extends Component {

  handleLogout = (event) => {
    this.props.logoutUser();
  }

  renderDropdown = () => {
    const userName = this.props.currentUser.user.username
    const locationsLoaded = !(this.props.nearbyLocations.length < 1)
    return (
      <Dropdown id="dropdown" direction="left" text={userName}>
        <Dropdown.Menu>
          <Dropdown.Item as={NavLink} to="/" text="Discover" />
          { locationsLoaded ? <Dropdown.Item as={NavLink} to="/around-me" text="What's Around Me?" /> : null}
          <Dropdown.Item as={NavLink} to="/user" text="Profile" />
          <Dropdown.Divider />
          <Dropdown.Item as={NavLink} to="/login" onClick={this.handleLogout} text="Logout" />
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  render() {
    return (
      <div id="navbar">
           <h3><i className="fas fa-coffee"></i> Bean There?</h3>
          {this.props.currentUser.user.id ? this.renderDropdown() : null }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return ({
    currentUser: state.currentUser,
    nearbyLocations: state.nearbyLocations
  })

}

export default connect(mapStateToProps,{logoutUser})(NavBar)
