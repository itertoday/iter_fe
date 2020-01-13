import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/home';
import Menu from './components/menu';
import Logout from './components/logout';
import Login from './components/login';
import Register from './components/register';
import Dashboard  from './components/dashboard';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(<>
    <Provider store = {store}>
        <Router>
            <Menu />
            <Switch>
                <Route path="/logout">
                    <Logout />
                </Route>
                <Route path="/login">
                    <Login />
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