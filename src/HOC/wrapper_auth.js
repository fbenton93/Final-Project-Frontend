import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Loader } from 'semantic-ui-react';
import { fetchCurrentUser } from '../actions'

const reqAuth = (WrappedComponent) => {
  class AuthorizedComponent extends React.Component {
    componentDidMount() {
      if (localStorage.getItem('jwt') && !this.props.currentUser.user.id) {
        this.props.fetchCurrentUser()
      }
    }

    render() {
      if (localStorage.getItem('jwt') && this.props.currentUser.user.id) {
        return <WrappedComponent />
      } else if (localStorage.getItem('jwt') && this.props.authenticatingUser) {
        return <Loader active inline="centered" />
      } else {
        // may have to use history in the short term
        return <Redirect to="/login" />
      }
    }
  }

  const mapStateToProps = (state) => {
    return {
      currentUser: state.currentUser,
      authenticatingUser: state.authenticatingUser
    }
  }



  return connect(mapStateToProps,{fetchCurrentUser})(AuthorizedComponent)

}

export default reqAuth
