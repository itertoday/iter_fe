import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRequests, getRequest, getProducts, getOrders, postRequest, updateRequestForm, updateProductItems, postPrice, updateTabKey, deleteRequest } from './../../actions';
import { Tab, Row, Col, Nav, Container, Form, Button, Card } from 'react-bootstrap';
import { OrderItem } from '../common';
import { LoadingComponent } from '../../common';
import LoadingForm  from './requestForm';

const Message = (props) => <div>{props.isLoaded}</div>

const LoadingRequest = LoadingComponent(Message);

const TrackingForm = () => {
    return <div>
        <Form>
            <Row>
                <Col>
                    <Form.Group controlId="formStartDate">
                        <Form.Label>Revise el estado de su envío</Form.Label>
                        <Form.Control type="text" name="tracker"  placeholder="Inserte Tracker" />
                        {/* <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text> */}
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    </div>
}

const MapTrackingForm = () => {
    return <div>Colocar mapa aquí</div>
}

class RequestView extends React.Component {
    constructor(props) {
        super(props);
        this.handleRequestSubmit = this.handleRequestSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handlePlusProduct = this.handlePlusProduct.bind(this);
        this.handleMinusProduct = this.handleMinusProduct.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.toOrderView = this.toOrderView.bind(this);
        this.editOrder = this.editOrder.bind(this);
        this.deleteOrder = this.deleteOrder.bind(this);
    }

    handlePlusProduct(e) {
        const productId = e.target.dataset.product;
        const { products } = this.props;
        const [product] = products.filter(item => item.id === parseInt(productId));
        if (product.quantity >= 0) {
            const newProduct = { ...product, quantity: product.quantity + 1 };
            let newProducts = products.filter(p => p.id !== newProduct.id).concat(newProduct);
            newProducts = newProducts.sort((p1, p2) => (p1.id < p2.id) ? -1 : 1);
            this.props.dispatch(updateProductItems(newProducts));
            const priceRequest = { products: newProducts.map(product => { return { quantity: product.quantity, product_type: product.product_type, id: product.id } }) }
            this.props.dispatch(postPrice(priceRequest));
        }
    }

    handleMinusProduct(e) {
        const productId = e.target.dataset.product;
        const { products } = this.props;
        const [product] = products.filter(item => item.id === parseInt(productId));
        if (product.quantity - 1 >= 0) {
            const newProduct = { ...product, quantity: product.quantity - 1 };
            let newProducts = products.filter(p => p.id !== newProduct.id).concat(newProduct);
            newProducts = newProducts.sort((p1, p2) => (p1.id > p2.id) ? 1 : -1);
            this.props.dispatch(updateProductItems(newProducts));
            const priceRequest = { products: newProducts.map(product => { return { quantity: product.quantity, product_type: product.product_type, id: product.id } }) }
            this.props.dispatch(postPrice(priceRequest));
        }
    }

    handleFormChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        const newRequestForm = { ...this.props.requestForm, ...{ [name]: value } };
        this.props.dispatch(updateRequestForm(newRequestForm));
    }

    handleRequestSubmit(e) {
        e.preventDefault();
        const { requestForm: payload } = this.props;
        const { products } = this.props;
        const items = products.map((product) => { return { product: product.id, quantity: product.quantity } });
        payload.items = items;
        this.props.postRequest(payload);
        this.props.getOrders();
        setTimeout(this.toOrderView, 3000);
    }

    handleSelect(key){
        this.props.updateTabKey(key);
    }

    toOrderView(){
        this.setState({ key:'second' });
    }
    componentDidMount() {
        this.props.getRequests();
        this.props.getProducts();
        this.props.getOrders();

    }

    editOrder(e){
        e.preventDefault();
        const {id} = e.target.dataset;
        this.props.updateTabKey('first');
        this.props.getRequest(id);
    }

    deleteOrder(e){
        e.preventDefault();
        const {id} = e.target.dataset;
        this.props.deleteRequest(id);
    }

    render() {
        const { userOrders: items, products, requestForm, price, redirect, tabKey } = this.props;
        const summaryOrders = (items.length > 0) ? <ul>
            {items.map((item, i) => {
                return <li key={i}><OrderItem data={item} readonly={true} onEdit={this.editOrder} onDelete={this.deleteOrder} /></li>;
            })}
        </ul> : <Card><Card.Body>Aún no ha creado órdenes</Card.Body></Card>
        return (
            <Container className="mt-5">
                <LoadingRequest isLoaded={!this.props.requestLoading} />
                <Tab.Container id="left-tabs-example"  activeKey={tabKey}  defaultKey="first" onSelect={this.handleSelect}>
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Nuevo Servicio</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Últimos Servicios</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">Tracking</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <LoadingForm isLoaded={this.props.productsLoaded}
                                        products={products}
                                        onRequestSubmit={this.handleRequestSubmit}
                                        request={requestForm}
                                        onFormChange={this.handleFormChange}
                                        onPlusProduct={this.handlePlusProduct}
                                        onMinusProduct={this.handleMinusProduct}
                                        price={price} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    {summaryOrders}
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <TrackingForm />
                                    <MapTrackingForm />
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
    return {
        'userRequests': state.requestsReducer.requests,
        'userOrders': state.ordersReducer.orders,
        'products': state.productsReducer.products,
        'productsLoaded': state.productsReducer.loaded,
        'requestForm': state.requestsReducer.requestForm,
        'requestRedirect': state.requestsReducer.redirect,
        'requestLoading': state.requestsReducer.loaded,
        'price': state.priceReducer.price,
        'tabKey': state.tabReducer.key
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getRequests,
    getRequest,
    getProducts,
    getOrders,
    postRequest,
    postPrice,
    updateTabKey,
    deleteRequest,
    dispatch
},
    dispatch)



export default connect(mapState, mapDispatchToProps)(RequestView);
