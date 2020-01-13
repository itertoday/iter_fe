import React from 'react';
import "../App.css";
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export class Menu extends React.Component {

  render() {
    const {isAuthenticated, token} = this.props;
    if (isAuthenticated) {
			return <nav className="navbar navbar-expand-lg navbar-light bg-light">
	        <Link className="navbar-brand" to="/">ITER</Link>
	        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
	            <span className="navbar-toggler-icon"></span>
	        </button>
	        <div className="collapse navbar-collapse" id="navbarSupportedContent">
	            <ul className="navbar-nav mr-auto">
	                <li className="nav-item active">
	                    <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
	                </li>
	                <li className="nav-item">
	                    <Link className="nav-link" to="/logout">Logout</Link>
	                </li><li className="nav-item">
	                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
	                </li>
	            </ul>
	        </div>
	    </nav>
		}else{
	    return <nav className="navbar navbar-expand-lg navbar-light bg-light">
	        <Link className="navbar-brand" to="/">ITER</Link>
	        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
	            <span className="navbar-toggler-icon"></span>
	        </button>
	        <div className="collapse navbar-collapse" id="navbarSupportedContent">
	            <ul className="navbar-nav mr-auto">
	                <li className="nav-item active">
	                    <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
	                </li>
	                <li className="nav-item">
	                    <Link className="nav-link" to="/login">Login</Link>
	                </li><li className="nav-item">
	                    <Link className="nav-link" to="/register">Registro</Link>
	                </li>
	            </ul>
	        </div>
	    </nav>
    }

  }

}

function mapState(state) {
  return { 'token':state.menuReducer.token, 'isAuthenticated':state.menuReducer.isAuthenticated }
}

export default connect(mapState)(Menu);