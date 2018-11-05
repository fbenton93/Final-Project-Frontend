import React from 'react';
import {Field,reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Segment,Grid,Button} from 'semantic-ui-react';
import {Slider} from 'react-semantic-ui-range';
import { postNewLocation } from '../actions';

class ReviewForm extends React.Component {

  onSubmit = (values) => {
    this.props.postNewLocation(values,this.props.userId,this.props.provisionalLocation)
    // find out how to close the modal
  }

  renderImageField = (field) => {
    return (
      <input type="file" name="profile_pic" accept="image/*" {...field.input} />
    )
  }

  renderTextField = (field) => {
    const inputClass = `ui input ${field.meta.touched && field.meta.error ? 'error' : ''}`
    const errorClass = `${field.meta.touched && field.meta.error ? 'ui warning message' : ''}`
    let type;
    type = (field.entryType ? type = field.entryType : "text")
    return (
      <div className="field-container">
        <div className={inputClass}>
          <label>{field.label}</label>
          <input type={type} {...field.input} />
        </div>
        <div className={errorClass}>
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    )
  }

  renderRangeField = (field) => {
    const settings = {
      start: 5,
      min: 0,
      max: 10,
      step: 0.5,
      ...field.input,
    }
    return (
      <>
      <label>{field.label}</label>
      <Slider discrete color={field.color} settings={settings} />
      </>
    )
  }




  render() {
    const {handleSubmit} = this.props
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Grid padded>
          <Grid.Column width={6}>
            <Segment>
              <Field name="score_busyness" label="Busyness" color="red" component={this.renderRangeField} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment>
              <Field name="score_ambiance" label="Overall Ambiance" color="teal" component={this.renderRangeField} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment>
              <Field name="score_table_space" label="Amount of Table Space" color="orange" component={this.renderRangeField} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment>
              <Field name="score_noise_level" label="Noise Level" color="yellow" component={this.renderRangeField} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment>
              <Field name="score_studying" label="Appropriateness for Studying" color="olive" component={this.renderRangeField} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment>
              <Field name="score_friendliness" label="Friendliness of Staff" color="green" component={this.renderRangeField} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment>
              <Field name="score_value" label="Value" color="teal" component={this.renderRangeField} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment>
              <Field name="score_coffee_quality" label="Coffee Quality" color="teal" component={this.renderRangeField} />
            </Segment>
          </Grid.Column>
        </Grid>
        <Button type="submit">Add New Location and Submit Review</Button>
      </form>
    )
  }
}

function validate() {
  let errors = {}

  return errors
}

function mapStateToProps(state) {
  return {
    userId: state.currentUser.user.id,
    provisionalLocation: state.provisionalLocation
  }
}


export default reduxForm({
  validate: validate,
  form: "ReviewForm"
})(
  connect(mapStateToProps,{postNewLocation})(ReviewForm)
)
