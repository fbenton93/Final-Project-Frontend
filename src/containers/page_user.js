import React from 'react';
import { Card } from 'semantic-ui-react'
import { connect } from 'react-redux'
import SignupForm from './form_signup'

import reqAuth from '../HOC/wrapper_auth'


class UserProfile extends React.Component {

  renderReviews = () => {
    return this.props.user.reviews.map((review) => {
      return (
        <Card>
          <div className="review-description">
            <h4>{review.title}</h4>
            <p>{review.written_content}</p>
          </div>
          <img className="review-photo" src={review.img_url} />
        </Card>
      )
    })
  }

  render() {
    const {user} = this.props
    console.log(user)
    return (
      <div id="profile-page">
        <div id="profile-upper">
          <Card><img src={user.user.profile_img_url}/></Card>
          <h1>{user.user.username}'s Profile</h1>
          <div id="profile-reviews">
            {this.renderReviews()}
          </div>
        </div>
        <div id="profile-lower">
          <h1>User Prefrences</h1>
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
