import React from 'react';


export const OrderItem = (props) => {
    const {request, price, status} = props.data;
    return <div className="request-item"> Request para la ciudad: {request.city}, items: {request.items.length}. Price: {price}. Status: {status}</div>
}