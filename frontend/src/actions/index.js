export const getRequests = () => {
    return {type: 'REQUESTS_LOADING', }
}

export const getProducts = () => {
    return {type: 'PRODUCTS_LOADING', }
}

export const getOrders = () => {
    return {type: 'ORDERS_LOADING', }
}

export const postRequest = (payload) => {
    return {type: 'POSTREQUEST_STARTED', payload }
}

export const postPrice = (payload) => {
    return {type: 'PRICE_REQUEST', products:payload}
}

export const updateProductItems = (newProducts) =>{
    return {type: 'PRODUCT_UPDATE', products: newProducts}
}

export const updateRequestForm = (form) =>{
   return  {type: 'REQUESTFORM_UPDATE', form }
}

export const updateOrder = (orderId) => {
	return { type: 'ORDERS_UPDATING', orderId }
}
