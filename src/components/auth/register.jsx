import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { registerUser } from '../../actions';



const renderField = field => (
  <div>
    <input className="form-control" {...field.input}/>
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
);

function validate(formProps) {
  const errors = {};

  if (!formProps.firstName) {
    errors.firstName = 'no first name';
  }

  if (!formProps.lastName) {
    errors.lastName = 'no last name';
  }

  if (!formProps.email) {
    errors.email = 'no email';
  }

  if (!formProps.password) {
    errors.password = 'no password';
  }

  return errors;
}

class Register extends Component {
  handleFormSubmit(formProps) {
    this.props.registerUser(formProps);
  }

  renderError() {
    if(this.props.errorMessage) {
      return (
        <div>
          <span>{ this.props.errorMessage }</span>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h1>Please fill all field to register in blog app</h1>
        <hr/>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          { this.renderError() }
          <div className="row">
            <div className="col-md-6 form-group">
              <label>First Name</label>
              <Field name="firstName" className="form-control" component={renderField} type="text" />
            </div>
            <div className="col-md-6 form-group">
              <label>Last Name</label>
              <Field name="lastName" className="form-control" component={renderField} type="text" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 form-group">
              <label>Email</label>
              <Field name="email" className="form-control" component={renderField} type="text" />
            </div>
            <div className="col-md-6 form-group">
              <label>Password</label>
              <Field name="password" className="form-control" component={renderField} type="password" />
            </div>
          </div>
          <div className="row text-center form-group">
              <button type="submit" className="btn btn-primary text-center">Register</button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
}

const form = reduxForm({
  form: 'register',
  validate
});

export default connect(mapStateToProps, { registerUser })(form(Register));