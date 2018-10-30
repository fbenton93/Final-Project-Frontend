import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'

class PostsNew extends Component {
  renderField = (field) => {
    const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
          <div className="text-help">
            {field.meta.touched ? field.meta.error : ''}
          </div>

      </div>
    )
  }
  renderSlider = (field) => {
    const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="range" {...field.input} />

          <div className="text-help">
            {field.meta.touched ? field.meta.error : ''}
          </div>
      </div>
    )
  }

  onSubmit = (values) => {
    console.log(values)
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)} >
        <Field name="title" label="Title" component={this.renderField} />
        <Field name="categories" label="Categories" component={this.renderField} />
        <Field name="content" label="Post Content" component={this.renderField} />
        <Field name="rating" label="Rating" component={this.renderSlider} />
        <button type="submit" className="btn btn-priamry">Submit</button>
      </form>
    )
  }
}

function validate(values) {
  const errors = {};

  if (!values.title || values.title.length < 3) {
    errors.title = "Enter a title that is at least three characters";
  }
  if (!values.categories) {
    errors.categories = "Enter some categories"
  }
  if (!values.content) {
    errors.content = "Enter some content"
  }

  return errors
  // if empty, the form is fine to submit
  // if obj has any properties, redux will assume the form is invalid
}

export default reduxForm({
  validate: validate,
  form: 'PostsNewForm'
})(
  connect(null,null)(PostsNew)
  // allows us to still connection props and, more importantly, actions to the form
  // remember, 'redux-form' will not handle the actual posting, so we need to feed in
  // our own action to facilitate that
)
