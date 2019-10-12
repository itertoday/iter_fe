import React from 'react';
import "./home.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, Redirect } from 'react-router-dom';


export class Login extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            redirect: false
        }
    }

    handleClick(e){
        e.preventDefault();
        this.setState({redirect: true});
        //Redirect to dashboard after validation (assuming everything is fine)
    }

    renderRedirect(){
        if(this.state.redirect){
            return <Redirect to="/dashboard" />;
        }
    }

    render() {
        return (
        <Container className="container " >
            {this.renderRedirect()}
            <Row className="row align-items-center mx-md-n5">
                <Col md={{ span: 6, offset: 3 }}>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control type="email" placeholder="Ingrese Correo" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Clave</Form.Label>
                            <Form.Control type="password" placeholder="Ingrese Clave" />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Link to="/forgot">Quiero recuperar mi clave</Link>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={this.handleClick}>
                            Ingresar
                    </Button>
                    </Form>
                </Col>
            </Row>
        </Container>);

    }
}

export const Register = () => (
    <Container className="register">
        <Row>
            <Col lg="6">
                <h4>Soy Cliente</h4>
                <form>
                    <div className="form-group">
                        <label htmlFor="cliente_correo">Correo</label>
                        <input type="email" className="form-control" id="cliente_email" aria-describedby="emailHelp" placeholder="Ingrese correo" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Clave</label>
                        <input type="password" className="form-control" id="cli-clave1" placeholder="Clave" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Confirmar Clave</label>
                        <input type="password" className="form-control" id="cli-clave2" placeholder="Clave" />
                    </div>

                    <button type="submit" className="btn btn-primary">Registrar</button>
                </form>
            </Col>
            <Col lg="6">
                <h4>Soy Transportista</h4>
                <form>
                    <div className="form-group">
                        <label htmlFor="transp_correo">Correo</label>
                        <input type="email" className="form-control" id="transp_correo" aria-describedby="emailHelp" placeholder="Ingrese correo" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Clave</label>
                        <input type="password" className="form-control" id="clave1" placeholder="Clave" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Confirmar Clave</label>
                        <input type="password" className="form-control" id="clave2" placeholder="Clave" />
                    </div>
                    <button type="submit" className="btn btn-primary">Registrar</button>
                </form>
            </Col>
        </Row>
    </Container>)
