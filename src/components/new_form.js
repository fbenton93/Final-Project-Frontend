import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
  renderField = (field) => {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        {field.meta.error}
      </div>
    )
  }

  render() {
    return (
      <form>
        <Field name="title" label="Title" component={this.renderField} />
        <Field name="categories" label="Categories" component={this.renderField} />
        <Field name="content" label="Post Content" component={this.renderField} />
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
    errors.categoriest = "Enter some categories"
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
})(PostsNew)
