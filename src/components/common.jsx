import React from 'react';
import { Button } from 'react-bootstrap';


const orderActions = (props, readonly) => {
	const output = [];
	if (props.status === 'pending'){
		output.push(<Button key = {props.id} onClick={props.onAcceptOrder} data-id={props.id}>Editar</Button>);
	}
	if(!readonly && props.status !== 'accepted'){
		output.push(<Button key = {props.id} onClick={props.onAcceptOrder} data-id={props.id}>Acceptar</Button>);
	}
	return output;
}

export const OrderItem = (props) => {
	const {request, price, status, id, tracker} = props.data;

    return (
    	<div className="request-item"> 
    		<p> Request para la ciudad: {request.city}, items: {request.items.length}. Price: {price}. Status: {status}. tracker: {tracker} </p>
			{orderActions(props.data, props.readonly)}

    	</div>)

}