import React from 'react';
import RequestView from './requests/requestsview';
import TransportView from './transport/transportview';
import { Container, Row, Col } from 'react-bootstrap';


export default class Dashboard extends React.Component {

    renderClient(props) {
        return <RequestView>{props.children}</RequestView>
    }

    renderTransport(props) {
        return <TransportView>{props.children}</TransportView>
    }

    render() {
        const userType = this.props.location.state.userType;
        return (
            <Container>
                <Row>
                    <Col>
                        {userType === "client" && this.renderClient(this.props)}
                        {userType === "transport" && this.renderTransport(this.props)}
                    </Col>
                </Row>
            </Container>
        );
    }
}