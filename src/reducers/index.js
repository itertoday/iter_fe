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

export function priceReducer(state={'price': 0, 'details':[]}, action){
    switch(action.type){
        case 'PRICE_RESPONSE':
            return {...state, price: action.price, loading: false }
        default:
            return state
    }
}
