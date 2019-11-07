import React from 'react';
import RequestView from './requests/requestsview';
import TransportView from './transport/transportview';
import { Carousel, Container, Row, Col } from 'react-bootstrap';


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
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src=""
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>First slide label</h3>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src=""
                                    alt="Third slide"
                                />

                                <Carousel.Caption>
                                    <h3>Second slide label</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src=""
                                    alt="Third slide"
                                />

                                <Carousel.Caption>
                                    <h3>Third slide label</h3>
                                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                </Row>
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