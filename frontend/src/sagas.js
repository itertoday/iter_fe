import { put, takeEvery, all, call, takeLatest } from 'redux-saga/effects';
import  { USERS_URL, REQUESTS_URL, ORDERS_URL, PRODUCTS_URL, PRICING_URL, LOGIN_URL, LOGOUT_URL, REGISTRATION_URL }  from './resource';


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

function* patchOrder({orderId}){
    const result = yield fetch(`${ORDERS_URL}${orderId}/`, { method: 'PATCH',
                                                              headers: {'Content-Type': 'application/json'},
                                                              body: JSON.stringify({status: "accepted"})
                                                          }).then(res=>res.json())
    yield put({type: 'ORDER_PATCH_DONE', result});

}

function* login({ payload: { username, password } }){
	try {
		const response = yield fetch(LOGIN_URL, { method: 'POST',
						    															headers: { 'Content-Type': 'application/json' },
						    															body: JSON.stringify({ username, password })});

		if (response.status >= 200 && response.status < 300) {
      const {token} = yield response.json();
      yield put({ type: 'AUTH_SUCCESS', payload: token });
    	localStorage.setItem('token', token);
    } else {
      throw response;
    }
	}catch(error){
		let message;
    switch (error.status) {
      case 500: message = 'Internal Server Error'; break;
      case 400: message = 'Credenciales Inválidas. Por favor intente de nuevo'; break;
      default: message = 'Something went wrong';
    }
    yield put({ type: 'AUTH_FAILURE', payload: message });
    localStorage.removeItem('token');
	}

}

function* logout({ payload: { token } }){
    console.log("logout function");
    try {
        const response = yield fetch(LOGOUT_URL, 
            {   method: 'POST',
		        headers: { 'Content-Type': 'application/json', 'Authorization': `token ${token}` },
		    });

        if (response.status >= 200 && response.status < 300) {
            //const {token} = yield response.json();
            console.log("LOGOUT_SUCCESS");
            yield put({ type: 'LOGOUT_SUCCESS' });
            localStorage.removeItem('token');
        } else {
            throw response;
        }
	}catch(error){
		let message;
        switch (error.status) {
        case 500: message = 'Internal Server Error'; break;
        case 400: message = 'Credenciales Inválidas. Por favor intente de nuevo'; break;
        default: message = 'Something went wrong';
        }
        yield put({ type: 'LOGOUT_FAILURE', payload: message });
	}
}

function* registration({ payload: { username, email, first_name, last_name, address, phone } }){
	try {
		const response = yield fetch(REGISTRATION_URL, { method: 'POST',
						    															headers: { 'Content-Type': 'application/json' },
						    															body: JSON.stringify({ username, email, first_name, last_name, profile: {address, phone} })});

		if (response.status >= 200 && response.status < 300) {
      const {url} = yield response.json();
      yield put({ type: 'REGISTRATION_SUCCESS', payload: url });
    } else {
      throw response;
    }
	}catch(error){
		let message;
    switch (error.status) {
      case 500: message = 'Internal Server Error'; break;
      case 400: message = 'Algunos Campos son Inválidos. Por favor intente de nuevo'; break;
      default: message = 'Something went wrong';
    }
    yield put({ type: 'REGISTRATION_FAILURE', payload: message });
	}

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

function* actionOrdersWatcher(){
    yield takeEvery('ORDERS_LOADING', fetchOrders);
}

function* actionPostRequestsWatcher(){
    yield takeEvery('POSTREQUEST_STARTED', doPostRequest);
}

function* actionPostPriceProductWatcher(){
    yield takeEvery('PRICE_REQUEST', doPostPriceProduct);
}

function* actionPatchOrderWatcher(){
    yield takeEvery('ORDERS_UPDATING', patchOrder);
}

function* actionLoginWatcher(){
    yield takeLatest('AUTH_REQUEST', login);
}

function* actionLogoutWatcher(){
    yield takeLatest('LOGOUT_REQUEST', logout);
}

function* actionRegistrationWatcher(){
    yield takeLatest('REGISTRATION_REQUEST', registration);
}

export default function* mySaga(){
    yield all([actionUserWatcher(), actionRequestsWatcher(), actionProductsWatcher(), actionPostRequestsWatcher(), actionPostPriceProductWatcher(), actionOrdersWatcher(), actionPatchOrderWatcher(), actionLoginWatcher(), actionRegistrationWatcher(), actionLogoutWatcher()])
}
