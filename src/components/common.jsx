import React from 'react';
import { Button } from 'react-bootstrap';


const orderActions = (props, readonly) => {
	const output = [];
	if (props.data.status === 'pending'){
		output.push(<Button key = "`${props.data.request.id}-edit`"  data-id={props.data.request.id} onClick={props.onEdit}> Editar </Button>);
		output.push(<Button key = "`${props.data.id}-delete`" data-id={props.data.request.id} onClick={props.onDelete}>Eliminar</Button>);
	}
	if(!readonly && props.data.status !== 'accepted'){
		output.push(<Button key = "`${props.data.id}-accept`" onClick={props.onAcceptOrder} data-id={props.data.id}>Acceptar</Button>);
	}
	return output;
}

export const OrderItem = (props) => {
	const {request, price, status, id, tracker} = props.data;
    return (
    	<div className="request-item"> 
    		<p> Request #{id}. Items: {request.items.length}. Price: {price}. Status: {status}. tracker: {tracker} </p>
			{orderActions(props, props.readonly)}
    	</div>)
}