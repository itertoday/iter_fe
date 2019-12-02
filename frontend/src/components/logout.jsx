import React from 'react';
import "../App.css";
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export class Logout extends React.Component {
	
	constructor(props){
		super(props);
		this.handleLogout = this.handleLogout.bind(this);
	}

	handleLogout(e){
    const token = this.props.token;
    this.props.dispatch({type: 'LOGOUT_REQUEST', payload:{ token }});
  }

  render() {
  	return (
  		<div>This is the logout page</div>
  	)
  }

}

function mapState(state) {
  return { 'token':state.logoutReducer.token, 'isAuthenticated':state.logoutReducer.isAuthenticated, 'error':state.logoutReducer.error }
}

export default connect(mapState)(Logout);