import { put, takeEvery, all } from 'redux-saga/effects';
import  { USERS_URL, REQUESTS_URL, ORDERS_URL, PRODUCTS_URL, PRICING_URL }  from './resource';


function* fetchUsers(){
    const json = yield fetch(USERS_URL).then( res => res.json());
    yield put({type: "LOADED_USERS", users: json});
}

function* fetchRequests(){
    const requests = yield fetch(REQUESTS_URL).then( res => res.json());
    yield put({type: "REQUESTS_LOADED", requests});
}

function* fetchOrders(){
    const orders = yield fetch(ORDERS_URL).then( res => res.json());
    yield put({type: "ORDERS_LOADED", orders});
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

function* doPostPriceProduct({products}){
    const price = yield fetch(PRICING_URL, { method: 'POST', 
                                             headers: {'Content-Type': 'application/json'},
                                             body: JSON.stringify(products)
                                          }).then(res=>res.json()).then(result => result.price)
    yield put({type: 'PRICE_RESPONSE', price})
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

function* actionOrderssWatcher(){
    yield takeEvery('ORDERS_LOADING', fetchOrders);
}

function* actionPostRequestsWatcher(){
    yield takeEvery('POSTREQUEST_STARTED', doPostRequest);
}

function* actionPostPriceProductWatcher(){
    yield takeEvery('PRICE_REQUEST', doPostPriceProduct);
}

export default function* mySaga(){
    yield all([actionUserWatcher(), actionRequestsWatcher(), actionProductsWatcher(), actionPostRequestsWatcher(), actionPostPriceProductWatcher(), actionOrderssWatcher()])
}
