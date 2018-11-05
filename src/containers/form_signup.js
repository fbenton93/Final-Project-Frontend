import React from 'react';
import {Field,reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Segment,Grid,Button} from 'semantic-ui-react';
import { Slider } from 'react-semantic-ui-range';
import { postNewUser } from '../actions'
import history from '../history'



class SignupForm extends React.Component {

  onSubmit = (values) => {
    this.props.postNewUser(values, () => {
      history.push('/')
    })
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
    console.log(field)
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
    // we should later refactor the below into a function that produces grid columns and their input
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Grid padded>
          <Grid.Column width={6}>
            <Segment>
              <div style={{height: "450px", width: "auto"}}>
                <Field name="username" label="New Username" component={this.renderTextField}/>
                <Field name="password" label="Enter a password" entryType="password" component={this.renderTextField}/>
                <Field name="password_confirmation" label="Confirm your password" entryType="password" component={this.renderTextField}/>
              </div>
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment>
              <div style={{height: "450px", width: "auto"}}>
                <h1>Upload a photo!</h1>
                <img src="" alt="Your Profile Here" />
                <Field name="profile_image_url" label="Upload a Profile Photo!" component={this.renderImageField} />
              </div>
            </Segment>
          </Grid.Column>
        </Grid>




        <h1>Indicate How Much You Agree With The Following</h1>
        <Grid padded>
          <Grid.Column width={6}>
            <Segment>
              <Field name="pref_busyness" label="I prefer a busy atmosphere" color="red" component={this.renderRangeField} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment>
              <Field name="pref_noise_level" label="I don't mind a little noise" color="teal" component={this.renderRangeField} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment>
              <Field name="pref_ambiance" label="Ambiance is an important aspect to any coffee shop" color="orange" component={this.renderRangeField} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment>
              <Field name="pref_coffee_quality" label="I'm only here to find the best coffee" color="yellow" component={this.renderRangeField} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment>
              <Field name="pref_light_roast" label="I enjoy light roasts" color="olive" component={this.renderRangeField} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment>
              <Field name="pref_medium_roast" label="I enjoy medium roasts" color="green" component={this.renderRangeField} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment>
              <Field name="pref_dark_roast" label="I enjoy dark roasts" color="teal" component={this.renderRangeField} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment>
              <Field name="pref_table_space" label="Table space is important when visiting a cafe" color="teal" component={this.renderRangeField} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment>
              <Field name="pref_studying" label="I'm looking for places to work/study" color="teal" component={this.renderRangeField} />
            </Segment>
          </Grid.Column>
        </Grid>
        <Button type="submit">Get Started!</Button>
      </form>
    )
  }
}










function validate(values) {
  const errors = {}
  if (values.username < 6) {
    errors.username = "Enter a Username (6 char minimum)"
  }
  if (values.password < 6) {
    errors.password = "Enter a Password (6 char minimum)"
  }
  if (values.password_confirmation !== values.password) {
    errors.password_confirmation = "Passwords Do Not match"
  }

  return errors
}



export default reduxForm({
  validate: validate,
  form: "SignupForm"
})(
  connect(null,{postNewUser})(SignupForm)
)
