import { put, takeEvery, all } from 'redux-saga/effects';
import  { USERS_URL, REQUESTS_URL, PRODUCTS_URL }  from './resource';


function* fetchUsers(){
    const json = yield fetch(USERS_URL).then( res => res.json());
    yield put({type: "LOADED_USERS", users: json});
}

function* fetchRequests(){
    const requests = yield fetch(REQUESTS_URL).then( res => res.json());
    yield put({type: "REQUESTS_LOADED", requests});
}

function* fetchProducts(){
    const products = yield fetch(PRODUCTS_URL).then( res => res.json()).then(data => data.results);
    yield put({type: "PRODUCTS_LOADED", products});
}

function* doPostRequest({payload}){ //Destructuring the action
    const request = yield fetch(REQUESTS_URL, { method: 'POST', 
                                                headers: { 'Content-Type': 'application/json'},
                                                body: JSON.stringify(payload) 
                                            }).then( res => res.json()).then(data => data.results);
    yield put({type: "POSTREQUEST_FINISHED", request});

} 

function* actionUserWatcher() {
    yield takeEvery('LOADING', fetchUsers);
}

function* actionRequestsWatcher(){
    yield takeEvery('REQUESTS_LOADING', fetchRequests);
}

function* actionProductsWatcher(){
    yield takeEvery('PRODUCTS_LOADING', fetchProducts);
}

function* actionPostRequestsWatcher(){
    yield takeEvery('POSTREQUEST_STARTED', doPostRequest);
}

export default function* mySaga(){
    yield all([actionUserWatcher(), actionRequestsWatcher(), actionProductsWatcher(), actionPostRequestsWatcher()])
}
