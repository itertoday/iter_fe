import React from 'react';
import "../App.css";
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from "react-bootstrap";

export class Logout extends React.Component {
	
	constructor(props){
		super(props);
		this.handleLogout = this.handleLogout.bind(this);
	}

	//Colocar un mensaje de confirmacion antes de hacer el logout y una redireccion al home
	handleLogout(e){
		e.preventDefault();
		console.log("Handle logout here");
		const token = this.props.token;
		console.log(token); 
    this.props.dispatch({type: 'LOGOUT_REQUEST', payload:{ token }});
  }

  render() {
		//const {isAuthenticated, token} = this.props;
  	return (
  		<Button variant="primary" type="submit" onClick={(e)=>this.handleLogout(e)}>
        Logout button
      </Button>
  	)
  }

}

function mapState(state) {
  return { 'token':state.authReducer.token, 'isAuthenticated':state.authReducer.isAuthenticated}
}


export default connect(mapState)(Logout);