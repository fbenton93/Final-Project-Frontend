import React from 'react';
import { Card } from 'semantic-ui-react'
import { connect } from 'react-redux'


class UserProfile extends React.Component {

  render() {
    const { user } = this.props
    return (
      <div id="profile-page">
        <div id="profile-upper">
          <Card><img src={user.profile_img_url}/></Card>
          <h1>{user.username}</h1>
          <div id="profile-reviews">
            <h4>Your Review History</h4>
            <Card>Review Title, Content, and Image Here</Card>
            <Card>Review Title, Content, and Image Here</Card>
            <Card>Review Title, Content, and Image Here</Card>
            <Card>Review Title, Content, and Image Here</Card>
          </div>
        </div>
        <div id="profile-lower">
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return ({
    user: state.currentUser.user
  })
}

export default connect(mapStateToProps)(UserProfile)
