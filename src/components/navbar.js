import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import history from '../history'


export default class NavBar extends React.Component {

  handleLogout = (event) => {
    history.push("/login")
    // need additional functionality for logout
  }

  render() {
    return (
      <div id="navbar">
        <h3>Bean There</h3>
          <Dropdown id="dropdown" text="Username">
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/" text="Discover" />
              <Dropdown.Item as={Link} to="/user" text="Profile" />
              <Dropdown.Divider />
              <Dropdown.Item onClick={this.handleLogout} text="Logout" />
            </Dropdown.Menu>
          </Dropdown>
      </div>
    )
  }
}
