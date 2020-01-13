import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import  { firstReducer, requestsReducer, usersReducer, productsReducer, priceReducer, ordersReducer, authReducer, logoutReducer, registrationReducer, menuReducer } from './reducers';
import mySaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
let store = createStore(combineReducers({firstReducer, usersReducer, requestsReducer, productsReducer, priceReducer, ordersReducer, authReducer, logoutReducer, registrationReducer, menuReducer}), 
                        applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);

export default store;