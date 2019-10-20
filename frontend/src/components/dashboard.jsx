import React from 'react';
import RequestView from './requests/requestsview';
import { Container, Row, Col } from 'react-bootstrap';


export default class Dashboard extends React.Component{

    render(){
        const sample = [{day: "monday"},{day: "tuesday"},{name: 3}];
        return (
            <Container>
                <Row>
                    <Col>
                        <RequestView items={sample}>
                            
                        </RequestView>
                    </Col>
                </Row>

            </Container>
        );
    }
}