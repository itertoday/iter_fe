export const getRequests = () => {
    return {type: 'REQUESTS_LOADING', }
}

export const getProducts = () => {
    return {type: 'PRODUCTS_LOADING', }
}

export const postRequest = (payload) => {
    return {type: 'POSTREQUEST_STARTED', payload }
}

export const updateProductItems = (newProducts) =>{
    return {type: 'PRODUCT_UPDATE', products: newProducts}
}

export const updateRequestForm = (form) =>{
   return  {type: 'REQUESTFORM_UPDATE', form }
}