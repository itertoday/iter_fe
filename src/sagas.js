import { put, takeEvery, all } from 'redux-saga/effects';
import  { REQUESTS_URL, CLIENT_ORDERS_URL, TRANSPORT_ORDERS_URL, PRODUCTS_URL, PRICING_URL }  from './resource';
import { NotificationManager } from 'react-notifications';

function* fetchRequests(){
    const requests = yield fetch(REQUESTS_URL).then( res => res.json());
    yield put({type: "REQUESTS_LOADED", requests});
}

function* fetchRequest(action){
    const { id } = action;
    const request = yield fetch(`${REQUESTS_URL}${id}`).then( res => res.json());
    yield put({type: "REQUEST_LOADED", request});
    const { items } = request;
    const products = items.map( item => { return {...item, id: item.product.id, req_item: item.id } } );
    yield put({type: "PRODUCTS_LOADED", products });
    yield doPostPriceProduct( {products:{ products } } );
}

function* deleteRequest(action){
    const {id} = action;
    const meta = {method: 'DELETE', headers: { 'Content-Type': 'application/json'} }
    const request = yield fetch(`${REQUESTS_URL}${id}`, meta ).then( res => res.text() );
    yield put({type: "DELETEREQUEST_LOADED", request});
}

function* fetchOrders(){
    const orders = yield fetch(CLIENT_ORDERS_URL).then( res => res.json());
    yield put({type: "ORDERS_LOADED", orders});
}

function* fetchTransportOrders(){ /* Curry this function */ 
    const orders = yield fetch(TRANSPORT_ORDERS_URL).then( res => res.json());
    yield put({type: "TRANSPORT_ORDERS_LOADED", orders});
}

function* fetchProducts(){
    const products = yield fetch(PRODUCTS_URL).then( res => res.json()).then(data => data.results);
    yield put({type: "PRODUCTS_LOADED", products});
}

function* doPostRequest({payload}){
    const action = (payload.id === 0)?'POST': 'PATCH';
    const url = (payload.id === 0)?REQUESTS_URL: `${REQUESTS_URL}${payload.id}/`;
    const meta = { method: action, headers: { 'Content-Type': 'application/json'}, body: JSON.stringify(payload) };
    const request = yield fetch(url, meta)
        .then((response) => {
            if(!response.ok){
                debugger;
                throw Error(response.statusText);
            }
            return response.json();
    }).then(data => {
            NotificationManager.success('Se ha creado una orden nueva!', 'Successful!', 12000);
            return Object.assign(data, {redirect: true});
        }).catch(err => {
            console.error("Error occured: ", err);
            NotificationManager.error ('Ocurrió un error al intentar crear la orden.', 'Error!', 12000);
        });

    yield put({type: "KEY_SENT", key:"second"});
    yield put({type: "POSTREQUEST_FINISHED", request});
    yield put({type: "PRODUCTS_RESET"});
    yield put({type: "PRICE_RESET"});
    fetchOrders();
}

function* doPostPriceProduct({products}){
    const price = yield fetch(PRICING_URL, { method: 'POST', 
                                             headers: {'Content-Type': 'application/json'},
                                             body: JSON.stringify(products)
                                          }).then(res=>res.json()).then(result => result.price)
    yield put({type: 'PRICE_RESPONSE', price})
}

function* patchOrder({orderId}){
    const result = yield fetch(`${CLIENT_ORDERS_URL}${orderId}/`, { method: 'PATCH',
                                                              headers: {'Content-Type': 'application/json'},
                                                              body: JSON.stringify({status: "accepted"})
                                                          }).then(res=>res.json())
    yield put({type: 'ORDER_PATCH_DONE', result});
}

function* actionRequestsWatcher(){
    yield takeEvery('REQUESTS_LOADING', fetchRequests);
}

function* actionRequestWatcher(){
    yield takeEvery('REQUEST_LOADING', fetchRequest);
}

function* actionProductsWatcher(){
    yield takeEvery('PRODUCTS_LOADING', fetchProducts);
}

function* actionOrdersWatcher(){
    yield takeEvery('ORDERS_LOADING', fetchOrders);
}

function* actionPostRequestsWatcher(){
    yield takeEvery('POSTREQUEST_STARTED', doPostRequest);
}

function* actionDeleteRequestWatcher(){
    yield takeEvery('DELETEREQUEST_STARTED', deleteRequest);
}

function* actionPostPriceProductWatcher(){
    yield takeEvery('PRICE_REQUEST', doPostPriceProduct);
}

function* actionPatchOrderWatcher(){
    yield takeEvery('ORDERS_UPDATING', patchOrder);
}

function* actionTransportOrdersWatcher(){
    yield takeEvery('TRANSPORT_ORDERS_LOADING', fetchTransportOrders);
}

export default function* mySaga(){
    yield all([actionRequestsWatcher(), actionRequestWatcher(), actionProductsWatcher(), actionPostRequestsWatcher(), actionPostPriceProductWatcher(), actionOrdersWatcher(), actionPatchOrderWatcher(), actionTransportOrdersWatcher(), actionDeleteRequestWatcher()])
}
