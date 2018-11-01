import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history';


class NavBar extends React.Component {

  handleLogout = (event) => {
    history.push("/login")
    // need additional functionality for logout
  }

  render() {
    const userName = this.props.currentUser.user.username

    return (
      <div id="navbar">
        <h3><i className="fas fa-coffee"></i> Bean There?</h3>
          <Dropdown id="dropdown" text={userName}>
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

function mapStateToProps(state) {
  return (
    {currentUser: state.currentUser}
  )
}

export default connect(mapStateToProps)(NavBar)
