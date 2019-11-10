import React from 'react';
import { Button } from 'react-bootstrap';


export const OrderItem = (props) => {
    const {request, price, status, id} = props.data;
    return (
    	<div className="request-item"> 
    		<p> Request para la ciudad: {request.city}, items: {request.items.length}. Price: {price}. Status: {status} </p>
    		{ !props.readonly && <Button onClick={props.onAcceptOrder} data-id={id}>Acceptar</Button>} definir id.
    	</div>)

}