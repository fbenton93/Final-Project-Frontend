import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { NavLink, withRouter } from 'react-router-dom';
import { logoutUser } from '../actions/user'
import { connect } from 'react-redux';



class NavBar extends React.Component {

  handleLogout = (event) => {
    this.props.logoutUser();
  }

  renderDropdown = () => {
    const userName = this.props.currentUser.user.username
    return (
      <Dropdown id="dropdown" text={userName}>
        <Dropdown.Menu>
          <Dropdown.Item as={NavLink} to="/" text="Discover" />
          <Dropdown.Item as={NavLink} to="/user" text="Profile" />
          <Dropdown.Divider />
          <Dropdown.Item as={NavLink} to="/login" onClick={this.handleLogout} text="Logout" />
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  render() {

    console.log(this.props)
    return (
      <div id="navbar">
          <h3><i className="fas fa-coffee"></i> Bean There?</h3>
          {this.props.currentUser.user.id ? this.renderDropdown() : null }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return (
    {currentUser: state.currentUser}
  )
}

export default connect(mapStateToProps,{logoutUser})(NavBar)
