import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { getOrders, updateOrder } from './../../actions';
import { Tabs, Tab } from 'react-bootstrap';
import { OrderItem } from '../common';

class TransportView extends React.Component {
    constructor(props){
        super(props);
        this.handleAccept = this.handleAccept.bind(this);
    }

    componentDidMount() {
        this.props.getOrders();
    }

    handleAccept(e){
        e.preventDefault();
        const orderId = e.target.dataset.id
        this.props.updateOrder(orderId);
    }

    render() {
        const activeOrders = this.props.userOrders.filter(item => item.status === 'pending');
        const doneOrders   = this.props.userOrders.filter(item => item.status === 'shipped');
        const acceptedOrders = this.props.userOrders.filter(item => item.status === 'accepted');


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
    return { 'userOrders': state.ordersReducer.orders, }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getOrders,
    updateOrder,
    dispatch
},
dispatch)

export default connect(mapState, mapDispatchToProps)(TransportView);