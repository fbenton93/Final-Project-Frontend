import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {loginUser} from '../actions';
import history from '../history';

class LoginForm extends React.Component {


  onSubmit = (values) => {
    this.props.loginUser(values,() => {history.push("/")})
  }

  renderTextField = (field) => {
    const inputClass = `ui input ${field.meta.touched && field.meta.error ? 'error' : ''}`
    const errorClass = `${field.meta.touched && field.meta.error ? 'ui warning message' : ''}`
    return (
      <div className="field-container">
        <div className={inputClass}>
          <label>{field.label}</label>
          <input type="text" {...field.input} />
        </div>
        <div className={errorClass}>
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    )
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field name="username" label="Username" component={this.renderTextField} />
          <Field name="password" label="Password" component={this.renderTextField} />
          <button type="submit" className="positive ui button">Login</button>
      </form>
    )
  }
}








function validate(values) {
  const errors = {}
  if (!values.username) {
    errors.username = "Enter a username (min 6 chars)"
  }
  if (!values.password) {
    errors.password = "Enter a password (min 6 chars)"
  }
  return errors
}



export default reduxForm({
  validate: validate,
  form: "LoginForm"
})(
  connect(null,{loginUser})(LoginForm)
)
