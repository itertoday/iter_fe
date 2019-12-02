export function firstReducer(state={'name': 'McArthur'}, action){
    switch(action.type){
        case 'RENAME':
            return { 'name': action.name }
        default:
            return state
    }
}

const initialFormState = {
    start_date: new Date().toISOString(),
    end_date: new Date().toISOString(),
    repeat: false,
    city: 'empty',
    address: '',
    address2: '',
    user: 2,
    items: [],
}


export function ordersReducer(state={orders:[]}, action){
    switch(action.type){
        case 'ORDERS_LOADED':
            return {...state, orders: action.orders, loaded: true};
        case 'ORDER_PATCH_DONE':
            return {...state, result: action.result, loaded: true};
        default:
            return state;
    }
}

export function requestsReducer( state={requests:[], loaded: false, requestForm: initialFormState }, action){
    switch(action.type){
        case 'REQUESTS_LOADED':
            return {...state, requests: action.requests, loaded: true}
        case 'REQUESTFORM_UPDATE':
            return {...state, requestForm: action.form}
        case 'POSTREQUEST_FINISHED':
            return state
        default:
            return state;
    }
}

export function productsReducer( state={products:[], loaded: false}, action){
    switch(action.type){
        case 'PRODUCTS_LOADED':
            const products = action.products.map(product => Object.assign({}, product, {quantity:0} ))
            return { ...state, products, loaded: true }
        case 'PRODUCT_UPDATE':
                const newProducts = action.products;
                return { ...state, products: newProducts, loaded: true }
        default:
            return state;
    }
}

export function usersReducer(state={'users': [] }, action){
    switch(action.type){
        case 'LOADING':
            return {...state, loading: true };
        case 'LOADED_USERS':
            return { ...state, users: action.users.results }
        default:
            return state
    }
}

export function priceReducer(state={'price': 0, 'details':[]}, action){
    switch(action.type){
        case 'PRICE_RESPONSE':
            return {...state, price: action.price, loading: false }
        default:
            return state
    }
}

export function authReducer(state={token: localStorage.getItem('token'), isAuthenticated: localStorage.getItem('token')?true:false, error: null, userType:'client'}, action){
    switch (action.type) {
	    case 'AUTH_SUCCESS':
	      return { ...state, isAuthenticated:true, token: action.payload };
	    case 'AUTH_FAILURE':
	      return { ...state, error: action.payload }
	    default:
	      return state;
  	}
}

export function logoutReducer(state={token: localStorage.getItem('token'), isAuthenticated: localStorage.getItem('token')?true:false, error: null}, action){
	switch (action.type) {
    case 'LOGOUT_SUCCESS':
      return { ...state, isAuthenticated:false, token: null };
    case 'LOGOUT_FAILURE':
      return { ...state, error: action.payload }
    default:
      return state;
  }
}

export function registrationReducer(state={url:"", registrationError:null}, action){
    switch (action.type) {
	    case 'REGISTRATION_SUCCESS':
	      return { ...state, url: action.payload };
	    case 'REGISTRATION_FAILURE':
	      return { ...state, registrationError: action.payload }
	    default:
	      return state;
  }
}


