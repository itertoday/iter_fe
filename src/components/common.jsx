import React from 'react';
import { Button } from 'react-bootstrap';


export const OrderItem = (props) => {
    const {request, price, status, id, tracker} = props.data;
    return (
    	<div className="request-item"> 
    		<p> Request para la ciudad: {request.city}, items: {request.items.length}. Price: {price}. Status: {status}. tracker: {tracker} </p>
    		{ !props.readonly && <Button onClick={props.onAcceptOrder} data-id={id}>Acceptar</Button>} definir id.
    	</div>)

}