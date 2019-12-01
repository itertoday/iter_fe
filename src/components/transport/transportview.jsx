import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { getTransportOrders, updateOrder } from './../../actions';
import { Tabs, Tab } from 'react-bootstrap';
import { OrderItem } from '../common';

class TransportView extends React.Component {
    constructor(props){
        super(props);
        this.handleAccept = this.handleAccept.bind(this);
    }

    componentDidMount() {
        this.props.getTransportOrders();
    }

    handleAccept(e){
        e.preventDefault();
        const orderId = e.target.dataset.id
        this.props.updateOrder(orderId);
    }

    getActiveOrders(items, status){
        const rightNow = new Date();
        rightNow.setHours(0,0,0);
        return items.filter(
                    item => new Date(item.request.start_date) > rightNow && rightNow <= new Date(item.request.end_date)
                   ).filter(
                    item => item.status === status
                );
    }

    render() {
        const activeOrders = this.getActiveOrders(this.props.userOrders, 'pending');
        const acceptedOrders = this.getActiveOrders(this.props.userOrders, 'accepted');
        const doneOrders   = this.props.userOrders.filter(item => item.status === 'shipped');

        return (
            <Tabs defaultActiveKey="activeOrders" id="uncontrolled-tab-example" className="mt-5">
                <Tab eventKey="activeOrders" title="Ordenes Activas">
                    { activeOrders && activeOrders.map( (order, i) => <OrderItem key={i} data={order} readonly={false} onAcceptOrder={this.handleAccept} />) }
                </Tab>
                <Tab eventKey="acceptedOrders" title="Ordenes Aceptadas">
                    { acceptedOrders && acceptedOrders.map( (order, i) => <OrderItem key={i} data={order} readonly={false} />) }
                </Tab>
                <Tab eventKey="doneOrders" title="Ordenes Realizadas">
                    { doneOrders && doneOrders.map( (order, i) => <OrderItem key={i} data={order} readonly={true} />) }
                </Tab>
            </Tabs>
        )
    }
}

function mapState(state) {
    return { 'userOrders': state.ordersReducer.transportOrders, }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getTransportOrders,
    updateOrder,
    dispatch
},
dispatch)

export default connect(mapState, mapDispatchToProps)(TransportView);