import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Loader } from 'semantic-ui-react';
import { fetchCurrentUser } from '../actions'
import { setUserCoords } from '../actions/user'

const reqAuth = (WrappedComponent) => {
  class AuthorizedComponent extends React.Component {
    componentDidMount() {
      if (localStorage.getItem('jwt') && !this.props.currentUser.user.id) {
        this.props.fetchCurrentUser()
      }
      // really shouldn't be here, because it's mounting all the time.
      navigator.geolocation.getCurrentPosition((response) => this.props.setUserCoords(response.coords.latitude,response.coords.longitude))
    }

    render() {
      if (localStorage.getItem('jwt') && this.props.currentUser.user.id ) {
        return <WrappedComponent />
      } else if (localStorage.getItem('jwt')){
        return <Loader />
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



  return connect(mapStateToProps,{fetchCurrentUser,setUserCoords})(AuthorizedComponent)

}

export default reqAuth
