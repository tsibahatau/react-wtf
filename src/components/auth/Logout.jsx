import React, { Component } from 'react';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions';



class Logout extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.dispatch(logoutUser());
  }

  render(){
    return null;
  }
}


export default connect()(Logout);