import React from 'react';
import {Field,reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Segment,Grid,Button} from 'semantic-ui-react';
import {Slider} from 'react-semantic-ui-range';

class ReviewForm extends React.Component {






  render() {
    return (
      <div>
      <h2>Review for {this.props.provisionalLocation.name}</h2>

      </div>
    )
  }
}

function validate() {
  let errors = {}

  return errors
}

export default reduxForm({
  validate: validate,
  form: "ReviewForm"
})(
  connect(null,null)(ReviewForm)
)
