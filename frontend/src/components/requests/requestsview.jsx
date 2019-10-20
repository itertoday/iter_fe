import React from 'react';
import { connect } from 'react-redux';
import { getRequests } from './../../actions';

const RequestItem = (props) => {
    return <div className="request-item"> Request para la ciudad: {props.data.city}, items: {props.data.items.length}</div>
}


class RequestView extends React.Component {
componentDidMount(){
    this.props.getRequests()
}
    render(){
        const {userRequests: items} = this.props;
        return (
            <div className="request-view">
                <ul>
                    {items.map((item, i) => {
                        return <li key={i}><RequestItem data={item} /></li>;
                    })}
                </ul>
                {this.props.children}
            </div>
        );
    }
}

function mapState(state) {
    return { 'userRequests': state.requestsReducer.requests, }
}

const mapDispatchToProps={
        getRequests
    }

export default connect(mapState, mapDispatchToProps)(RequestView);