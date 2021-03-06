import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { loginUser } from '../../actions';

const form = reduxForm({
  form: 'login'
});

class Login extends Component {
  handleFormSubmit(formProps) {
    this.props.loginUser(formProps);
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
        <h1>Welcome to react blogapp! Please authorize or <a href="/register">register</a> to access.</h1>
        <hr/>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <h3>{ this.renderError() }</h3>
          <div className="row">
            <div className="col-md-6 col-md-offset-3 form-group">
              <label>Email</label>
              <Field name="email" className="form-control" component="input" type="text" />
            </div>
          </div >
          <div className="row">
            <div className="col-md-6 col-md-offset-3 form-group">
              <label>Password</label>
              <Field name="password" className="form-control" component="input" type="password" />
            </div>
          </div>
          <div className="row text-center form-group">
            <button type="submit" className="btn btn-primary">Login</button>
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

export default connect(mapStateToProps, { loginUser })(form(Login));