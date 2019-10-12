import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/home';
import { Login, Register } from './components/login';
import Dashboard  from './components/dashboard';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import mySaga from './sagas';

export const Menu = () => {
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

function firstReducer(state={'name': 'McArthur'}, action){
    switch(action.type){
        case 'RENAME':
            return { 'name': action.name }
        default:
            return state
    }
}

function secondReducer(state={'console': 'PS4'}, action){
    switch(action.type){
        case 'CHANGE':
            return { 'console': action.console }
        default:
            return state
    }
}

function usersReducer(state={'users': [] }, action){
    console.log("usersReducer()");
    switch(action.type){
        case 'LOADING':
            console.log("loading fired! info: ", action);
            return {...state, loading: true };
        case 'LOADED_USERS':
            return { ...state, users: action.users.results }
        default:
            return state
    }
}

const sagaMiddleware = createSagaMiddleware();
let store = createStore(combineReducers({firstReducer, secondReducer, usersReducer}), 
                        applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);

ReactDOM.render(<>
    <Provider store = {store}>
        <Router>
            <Menu />
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/dashboard">
                    <Dashboard />
                </Route>
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
