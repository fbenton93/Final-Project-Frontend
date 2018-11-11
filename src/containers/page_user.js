import React from 'react';
import { Card } from 'semantic-ui-react'
import { connect } from 'react-redux'
import SignupForm from './form_signup'
import ScoreCard from '../components/score_card'

import reqAuth from '../HOC/wrapper_auth'


class UserProfile extends React.Component {

  renderReviews = () => {
    return this.props.user.reviews.map((review) => {
      return (
        <Card id="users-review">
          <ScoreCard review={review} username={this.props.user.user.username} />
        </Card>
      )
    })
  }

  render() {
    const {user} = this.props
    return (
      <div id="profile-page">
        <div id="profile-upper">
          <Card className="profile-card">
            <div className="img-container"><img src={user.user.profile_img_url}/></div>
            <h1 className="marker">{user.user.username}</h1>
          </Card>
          <div id="profile-reviews">
            {this.renderReviews()}
          </div>
        </div>
        <div id="profile-mid"><h1>User Preferences <i class="fas fa-chevron-down"></i></h1></div>
        <div id="profile-lower">
            <SignupForm preferences={{value: true}} />
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return ({
    user: state.currentUser
  })
}

export default reqAuth(connect(mapStateToProps)(UserProfile))
