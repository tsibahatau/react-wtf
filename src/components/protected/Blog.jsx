import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Field, reduxForm} from 'redux-form';
import {createPost, getBlogPosts} from '../../actions';

const form = reduxForm({
  form: 'blog'
});


class Blog extends Component {

  handleFormSubmit(formProps) {
    this.props.createPost(formProps);
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toDateString();
  }


  constructor(props) {
    super(props);
    this.props.getBlogPosts();
  }

  renderContent() {
    if (this.props.content) {
      return (
        <div>
          <hr/>
          <h2>Recent blogs:</h2>
          {this.props.content.map(blogPost => (
            <div className="blogPost" key={blogPost._id}>
              <h3> { blogPost.title } </h3>
              <div> Written at { this.formatDate(blogPost.createdAt) } <span> by { blogPost.author.email } </span></div>
              <div> { blogPost.text } </div>
              <hr/>
            </div>
          ))}
        </div>
      );
    }
  }

  renderCreateBlogPost() {
    const {handleSubmit} = this.props;
    return (
      <div className="text-center">
        <h2> Do you have anything to share?</h2>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

          <div  className="row">
           <div className="col-md-6 col-md-offset-3 form-group">
              <label htmlFor="title">Post title:</label>
              <Field name="title" className="form-control" component="input" type="text"/></div>
            </div>
          <div className="row">
            <div className="col-md-6 col-md-offset-3 form-group">
              <label htmlFor="text">Post content:</label>
              <Field name="text" className="form-control" component="textarea" type="text"/>
            </div>
          </div>
          <div className="row text-center form-group">
            <button type="submit" className="btn btn-primary">Add post</button>
          </div>
        </form>
      </div>);
  }

  render() {
    return (
      <div>
        <h1>Welcome to the blog app! <a href="/logout">Logout</a></h1>
        {this.renderContent()}
        {this.renderCreateBlogPost()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    content: state.auth.content,
    //user: state.auth.user
  };
}

export default connect(mapStateToProps, {createPost, getBlogPosts})(form(Blog));