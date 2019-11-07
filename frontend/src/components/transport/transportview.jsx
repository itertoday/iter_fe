import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { getOrders } from './../../actions';
import { Tabs, Tab } from 'react-bootstrap';
import { OrderItem } from '../common';

class TransportView extends React.Component {

    componentDidMount() {
        this.props.getOrders();
    }
    render() {
        const activeOrders = this.props.userOrders.filter(item => item.status === 'pending');
        const doneOrders   = this.props.userOrders.filter(item => item.status === 'done');

        return (
            <Tabs defaultActiveKey="activeOrders" id="uncontrolled-tab-example" className="mt-5">
                <Tab eventKey="activeOrders" title="Ordenes">
                    {activeOrders && activeOrders.map( (order, i) => <OrderItem key={i} data={order}></OrderItem>) }
                </Tab>
                <Tab eventKey="doneOrders" title="Orden">
                {doneOrders && doneOrders.map( (order, i) => <OrderItem key={i} data={order} read_only={true}></OrderItem>) }
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
    dispatch
},
dispatch)

export default connect(mapState, mapDispatchToProps)(TransportView);