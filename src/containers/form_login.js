import React from 'react';
import { Button,Segment,Input } from 'semantic-ui-react'
import {connect} from 'react-redux';
import {loginUser} from '../actions';
import history from '../history';

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }


  handleSubmit = (e) => {
    e.preventDefault()
    this.props.loginUser(this.state,() => {history.push("/")})
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
s


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Segment style={{width: '80%', margin: '5% 10%'}}>
          <label>Username</label>
          <br />
          <Input type='text' name='username' value={this.state.username} onChange={this.handleChange} />
        </Segment>
        <Segment style={{width: '80%', margin: '5% 10%'}}>
          <label>Password</label>
          <br />
          <Input type='password' name="password" value={this.state.password} onChange={this.handleChange} />
        </Segment>

        <Button type="submit">Login!</Button>
      </form>
    )
  }
}


export default connect(null,{loginUser})(LoginForm)
