import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/home';
import { Login, Register } from './components/login';
import Dashboard  from './components/dashboard';
import Dash  from './dash';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import LoadingForm  from './components/requests/requestForm';
import  { requestsReducer, productsReducer, priceReducer, ordersReducer, tabReducer } from './reducers';
import mySaga from './sagas';
import { composeWithDevTools } from 'redux-devtools-extension';
import {  NotifyClientReader } from './common';

import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

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

const sagaMiddleware = createSagaMiddleware();
let store = createStore( combineReducers({requestsReducer, productsReducer, priceReducer, ordersReducer, tabReducer}),
                         composeWithDevTools(applyMiddleware(sagaMiddleware)) );
sagaMiddleware.run(mySaga);
const onMessage = (message) => {
    const fromServer =  JSON.parse(message.data);
    const payload = fromServer.payload.pk; //This is too much. maybe we can just make the server return what we need
    store.dispatch({type:'ORDER_ACCEPTED', payload})
    NotificationManager.success('Han aceptado tu petición!', 'Éxito!', 12000);
}
let client = new NotifyClientReader(onMessage);

ReactDOM.render(<>
    <Provider store = {store}>
        <Router>
            <Menu />
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register" component={Register} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/dash" component={Dash} />
                <Route path={["/request/:requestId", "/request"]} render={(props) => <LoadingForm {...props} isLoaded={true} />}  />
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
            <NotificationContainer />
        </Router>
    </Provider>
</>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
