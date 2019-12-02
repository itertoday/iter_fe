import React from 'react';
import "../App.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'


export class Login extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.state = {
            redirect: false,
            userType: "client",
            username: "",
            password: ""
        }
    }

    handleClick(userType, e){
        e.preventDefault();
        const { username, password } = this.state;
        this.setState({redirect: true, userType: userType});
    		this.props.dispatch({type: 'AUTH_REQUEST', payload:{ username, password }});
    }

    handleOnChange(input, value) {
    	this.setState({ [input]: value });
  	}

    renderRedirect(userType){
        console.log("redirected with", userType);
        //if(this.state.redirect){
          return <Redirect to={{
              pathname: "/dashboard",
              state: { userType }
          }} />;
        //}
    }

    render() {
        const {userType} = this.state;
        const {error, isAuthenticated, token} = this.props;

        if (isAuthenticated) {
        	return this.renderRedirect(userType);
		    }

        return (
        <Container className="container " >
            <Row className="row align-items-center mx-md-n5">
                <Col md={{ span: 6, offset: 3 }}>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese Usuario" defaultValue={this.state.username} onChange={(e)=>this.handleOnChange('username',e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Clave</Form.Label>
                            <Form.Control type="password" placeholder="Ingrese Clave" defaultValue={this.state.password} onChange={(e)=>this.handleOnChange('password',e.target.value)}/>
                        </Form.Group>
                        <span className="simple-error-message">{error}</span>
                        <Form.Group controlId="formBasicCheckbox">
                            <Link to="/forgot">Quiero recuperar mi clave</Link>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={(e)=>this.handleClick('client',e)}>
                            Ingresar
                    </Button>
                    <Button variant="primary" type="submit" onClick={(e)=>this.handleClick('transport',e)}>
                            Ingresar Transportista
                    </Button>
                    </Form>
                </Col>
            </Row>
        </Container>);

    }
}

function mapState(state) {
  return { 'token':state.authReducer.token, 'isAuthenticated':state.authReducer.isAuthenticated, 'error':state.authReducer.error, 'userType':state.authReducer.userType }
}

export default connect(mapState)(Login);