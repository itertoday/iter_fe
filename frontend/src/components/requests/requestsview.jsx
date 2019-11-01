import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { getRequests, getProducts, postRequest, updateRequestForm, updateProductItems } from './../../actions';
import { Tab, Row, Col, Nav, Container, Form, Button, Card } from 'react-bootstrap';

const RequestItem = (props) => {
    return <div className="request-item"> Request para la ciudad: {props.data.city}, items: {props.data.items.length}</div>
}

const ProductItem = (props) => {

    // const [count, setCount] = useState(1);

    return (
        <Col>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.item.image_url} style={{ width: '200px', height: '200px' }} className="ml-5 mt-4" />
                <Card.Body>
                    <Card.Title>{props.item.name} ({props.item.product_type})</Card.Title>
                    <Card.Text> Descripcion del producto (soon) </Card.Text>
                    {/* <Button variant="primary" onClick={() => { setCount(count + 1); props.onProductItemClick(props.item, count); } } >Agregar</Button> */}
                    <Button variant="primary" onClick={props.onPlusProduct} data-product={props.item.id} >  + </Button>
                    <Button variant="secondary" onClick={props.onMinusProduct} data-product={props.item.id} > - </Button>
                    <p>{props.item.quantity}</p>

                </Card.Body>
            </Card>
        </Col>
    );
}

const RequestForm = ({onRequestSubmit, products, request, onFormChange, onProductUpdate, onPlusProduct, onMinusProduct }) => {
    const { start_date, end_date, city, repeat, user, address, address2 } = request;
    return (
        <Form onSubmit={onRequestSubmit}>

            <Row>
                {products.map((product) => {
                    return <ProductItem key={product.id} item={product} amount={product.quantity} onProductItemClick={onProductUpdate} onPlusProduct={onPlusProduct} onMinusProduct={onMinusProduct}/>
                })}
            </Row>
            <Row>
                <Col md={4}></Col>
                <Col md={{ span: 4, offset: 4 }} className="mt-3">
                    <h3> Total: USD 12000</h3>
                </Col>
            </Row>

            <hr />
            <Row>
                <Col>
                    <Form.Group controlId="formStartDate">
                        <Form.Label>Inicio de envío</Form.Label>
                        <Form.Control type="datetime" name="start_date" value={start_date} placeholder="Fecha de inicio de envío" onChange={onFormChange} />
                        {/* <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text> */}
                    </Form.Group>

                    <Form.Group controlId="formEndDate">
                        <Form.Label>Final de Envío</Form.Label>
                        <Form.Control type="datetime" name="end_date" value={end_date} placeholder="Fecha final de envío" onChange={onFormChange} />
                        {/* <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text> */}
                    </Form.Group>
                    <Form.Control type="hidden" name="user" value={user} placeholder="Coloque dirección de llegada" onChange={onFormChange} />
                    <Form.Control type="hidden" name="repeat" value={repeat} placeholder="Coloque dirección de llegada" onChange={onFormChange} />
                    <Form.Control type="hidden" name="city" value={city} placeholder="Coloque dirección de llegada" onChange={onFormChange} />

                </Col>
                <Col>
                    <Form.Group controlId="formAdress1">
                        <Form.Label>Dirección de salida</Form.Label>
                        <Form.Control type="text" name="address" value={address} placeholder="Coloque dirección de salida" onChange={onFormChange} />
                        {/* <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text> */}
                    </Form.Group>

                    <Form.Group controlId="formAdress2">
                        <Form.Label>Dirección de llegada</Form.Label>
                        <Form.Control type="text" name="address2" value={address2} placeholder="Coloque dirección de llegada" onChange={onFormChange} />
                        {/* <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text> */}
                    </Form.Group>
                </Col>
            </Row>
            <Button variant="primary" type="submit"> Submit </Button>
        </Form>
    );
}


class RequestView extends React.Component {
    constructor(props) {
        super(props);
        this.handlerAddProduct = this.handlerAddProduct.bind(this);
        this.handleRequestSubmit = this.handleRequestSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleProductUpdate = this.handleProductUpdate.bind(this);
        this.handlePlusProduct = this.handlePlusProduct.bind(this);
        this.handleMinusProduct = this.handleMinusProduct.bind(this);
    }

    handlePlusProduct(e){
        const productId = e.target.dataset.product;
        const {products} = this.props;
        const [ product ] = products.filter(item => item.id === parseInt(productId) );
        const newProduct = {...product, quantity:product.quantity + 1 };
        let newProducts = products.filter(p => p.id !== newProduct.id).concat(newProduct);
        newProducts = newProducts.sort((p1,p2) => (p1.id < p2.id)?-1:1);
        this.props.dispatch(updateProductItems(newProducts));
        
    }

    handleMinusProduct(e){
        const productId = e.target.dataset.product;
        const {products} = this.props;
        const [ product ] = products.filter(item => item.id === parseInt(productId) );
        const newProduct = {...product, quantity:product.quantity - 1 };
        let newProducts = products.filter(p => p.id !== newProduct.id).concat(newProduct);
        newProducts = newProducts.sort((p1,p2) => (p1.id > p2.id)?1:-1);
        this.props.dispatch(updateProductItems(newProducts));
    }

    handleProductUpdate(product, count){
        console.log("vamos bien: ", product, count);
        // const { items } = this.props.RequestForm;
        // const obj = {quantity: count, product: product.id }
        // if (items === []){
        //     items.append(obj)
        // }else {

            
        // }

        
    }

    handleFormChange(e){
        e.preventDefault();
        const { name, value } = e.target;
        const newRequestForm = {...this.props.requestForm, ...{[name]: value}};
        this.props.dispatch(updateRequestForm(newRequestForm));
    }

    handlerAddProduct(e) {
        e.preventDefault();
    }

    handleRequestSubmit(e){
        e.preventDefault();
        const {requestForm: payload} = this.props;
        const {products} = this.props;
        const items = products.map( (product) => { return {product: product.id, quantity: product.quantity}} )
        payload.items = items;
        this.props.postRequest(payload);
    }

    componentDidMount() {
        this.props.getRequests();
        this.props.getProducts();
    }

    render() {
        const { userRequests: items, products, requestForm } = this.props;
        return (
            <Container className="mt-5">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Nuevo Servicio</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Ultimos Servicios</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <RequestForm products={products} onRequestSubmit={this.handleRequestSubmit} request={requestForm} onFormChange={this.handleFormChange} onProductUpdate={this.handleProductUpdate} onPlusProduct={this.handlePlusProduct} onMinusProduct={this.handleMinusProduct}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <ul>
                                        {items.map((item, i) => {
                                            return <li key={i}><RequestItem data={item} /></li>;
                                        })}
                                    </ul>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        );
    }
}

function mapState(state) {
    return { 'userRequests': state.requestsReducer.requests, 
             'products': state.productsReducer.products, 
             'requestForm': state.requestsReducer.requestForm }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getRequests,
    getProducts,
    postRequest,
    dispatch
},
dispatch,)



export default connect(mapState, mapDispatchToProps)(RequestView);