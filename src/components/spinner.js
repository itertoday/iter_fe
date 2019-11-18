import React from 'react';
import {Col} from 'react-bootstrap';
import spinner from '../822.gif';

export default class Spinner extends React.Component {

    render() {
        return (
            <Col md={{ span: 3, offset: 3 }}>
                <img
                    src={spinner}
                    style={{ margin: 'auto', display: 'block' }}
                    alt="Loading..."
                />
            </Col>)
    }
}