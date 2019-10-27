export function firstReducer(state={'name': 'McArthur'}, action){
    switch(action.type){
        case 'RENAME':
            return { 'name': action.name }
        default:
            return state
    }
}

export function requestsReducer( state={requests:[], loaded: false}, action){
    switch(action.type){
        case 'REQUESTS_LOADED':
            return {requests: action.requests, loaded: true}
        default:
            return state;
    }
}

export function productsReducer( state={products:[], loaded: false}, action){
    switch(action.type){
        case 'PRODUCTS_LOADED':
            return { products: action.products, loaded: true }
        default:
            return state;
    }
}

export function secondReducer(state={'console': 'PS4'}, action){
    switch(action.type){
        case 'CHANGE':
            return { 'console': action.console }
        default:
            return state
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
