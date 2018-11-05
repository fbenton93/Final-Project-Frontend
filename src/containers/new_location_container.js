// this is a container that renders the new location form and then
// immediately runs the post for reviews to that new location
// submitting location info should trigger a state change that
// renders the review form.
import React from 'react';
import ReviewForm from './form_review';
import NewLocationForm from './form_new_location';
import { connect } from 'react-redux';




class NewLocationContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props)
    return (<div>{this.props.locationWasAdded ? <ReviewForm /> : <NewLocationForm />}</div>)
  }


}

function mapStateToProps(state) {
  return {
    locationWasAdded: state.locationWasAdded,
    provisionalLocation: state.provisionalLocation
  }
}

export default connect(mapStateToProps)(NewLocationContainer)
