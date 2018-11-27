import React from 'react';
import LoginForm from './form_login'
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react'
import { withRouter, Redirect } from 'react-router'
import { setUserCoords } from '../actions/user'

class LoginSignupPage extends React.Component {

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((response) => this.props.setUserCoords(response.coords.latitude,response.coords.longitude))
  }

  render() {
    return (
      <>
      <div id="login-page"></div>
      <div id="login-panel">
        <div id="login-form">
          <h1>Login</h1>
          <LoginForm />
        </div>
        <div id="signup-redirect">
          <Button color="orange" as={Link} to="/signup">Sign Up Now!</Button>
        </div>
      </div>
      </>
    )
  }
}

export default withRouter(LoginSignupPage)
