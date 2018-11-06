import React from 'react';
import {Field,reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Segment,Grid,Button} from 'semantic-ui-react';
import {Slider} from 'react-semantic-ui-range';
import { postNewLocation,fetchLocations, postNewReview } from '../actions';
import history from '../history'

class ReviewForm extends React.Component {

  onSubmit = (values) => {
    if (this.props.provisionalLocation.id) {
      this.props.postNewReview(values,this.props.userId,this.props.provisionalLocation.id)
    } else {
      this.props.postNewLocation(values,this.props.userId,this.props.provisionalLocation)
    }
  }

  renderImageField = (field) => {
    return (
      <input type="file" name="profile_pic" accept="image/*" {...field.input} />
    )
  }

  renderTextArea = (field) => {
    return (
      <>
        <label>{field.label}</label>
        <textarea name="written_content" {...field.input}></textarea>
      </>
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
    // tomorrow. change time_visited to dropdown
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Grid padded>
        <Grid.Column width={6}>
          <Segment>
            <Field name="title" label="Title" component={this.renderTextField} />
          </Segment>
        </Grid.Column>
        <Grid.Column width={6}>
          <Segment>
            <Field name="written_content" label="Your Written Review Here" component={this.renderTextArea} />
          </Segment>
        </Grid.Column>
        <Grid.Column width={6}>
          <Segment>
            <Field name="score_roast" label="Describe the Roast (i.e. 'too dark','just right', etc.)" component={this.renderTextField} />
          </Segment>
        </Grid.Column>
        <Grid.Column width={6}>
          <Segment>
            <Field name="img_url" label="Enter Image URL" component={this.renderTextField} />
          </Segment>
        </Grid.Column>
        <Grid.Column width={6}>
          <Segment>
            <Field name="time_visited" label="Time Visited" component={this.renderTextField} />
          </Segment>
        </Grid.Column>
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
  connect(mapStateToProps,{postNewLocation,postNewReview})(ReviewForm)
)
