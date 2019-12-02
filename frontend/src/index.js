import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/home';
import Login from './components/login';
import Logout from './components/logout';
import Register from './components/register';
import Dashboard  from './components/dashboard';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';

export const Menu = () => {

		const state = store.getState();

		if (state.authReducer.isAuthenticated) {
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

ReactDOM.render(<>
    <Provider store = {store}>
        <Router>
            <Menu />
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/logout">
                    <Logout />
                </Route>
                <Route path="/register" component={Register} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    </Provider>
</>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();