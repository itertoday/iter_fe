import React from 'react';
import "../App.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


class Register extends React.Component {
	constructor(props){
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
	    	username: "",
	    	email: "",
	    	first_name: "",
	    	last_name: "",
	    	address: "",
	    	phone: ""
    }
  }

  handleOnChange(input, value) {
    this.setState({ [input]: value });
  }

  handleClick(e) {
  	e.preventDefault();
  	const { username, email, first_name, last_name, address, phone } = this.state;
  	this.props.dispatch({type: 'REGISTRATION_REQUEST', payload:{ username, email, first_name, last_name, address, phone }});
  }

  render() {

  	const { error, isAuthenticated, token, url, registrationError } = this.props;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    }

    if(url) {
    	return(
    		<Container className="register">
    			<h4>Usuario creado!</h4>
    		</Container>
    	)
    }
    
    return (
    <Container className="register">
      <Row>
        <Col lg="12">
          <h4>Nuevo Usuario</h4>
          <form>
            <div className="form-group">
              <label htmlFor="username">Usuario</label>
              <input type="text" className="form-control" id="username" placeholder="Ingrese usuario" onChange={(e)=>this.handleOnChange('username',e.target.value)}/>
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Ingrese correo" onChange={(e)=>this.handleOnChange('email',e.target.value)}/>
            </div>

            <div className="form-group">
              <label htmlFor="first_name">Nombre</label>
              <input type="text" className="form-control" id="first_name" placeholder="Ingrese Nombre" onChange={(e)=>this.handleOnChange('first_name',e.target.value)}/>
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Apellido</label>
              <input type="text" className="form-control" id="last_name" placeholder="Ingrese Apellido" onChange={(e)=>this.handleOnChange('last_name',e.target.value)}/>
            </div>

            <div className="form-group">
              <label htmlFor="address">Dirección</label>
              <input type="text" className="form-control" id="address" placeholder="Ingrese Dirección" onChange={(e)=>this.handleOnChange('address',e.target.value)}/>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Teléfono</label>
              <input type="text" className="form-control" id="phone" placeholder="Ingrese Teléfono" onChange={(e)=>this.handleOnChange('phone',e.target.value)}/>
            </div>

            <div className="form-group">
            	<input type="radio" name="userType" id="type_client" value="client"/><label htmlFor="type_client" className="radio-label">Cliente</label>
            	<input type="radio" name="userType" id="type_transport" value="transport"/><label htmlFor="type_transport" className="radio-label">Transportista</label>
            </div>
            
            <button type="submit" className="btn btn-primary" onClick={(e)=>this.handleClick(e)}>Registrar</button>
          </form>
        </Col>
       
      </Row>
    </Container>)
 	}

}

function mapState(state) {
	return { 'token':state.authReducer.token, 'isAuthenticated':state.authReducer.isAuthenticated, 'error':state.authReducer.error, 'url':state.registrationReducer.url, 'registrationError':state.registrationReducer.registrationError }
}


export default connect(mapState)(Register);