import React from 'react';
import {Field,reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Segment,Grid,Button} from 'semantic-ui-react';
import {Slider} from 'react-semantic-ui-range';

class ReviewForm extends React.Component {
  render() {
    return (
      <div>Test</div>
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
