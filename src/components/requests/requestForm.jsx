import React from "react";
import {Button, Card, Col, Form, Row, Container} from "react-bootstrap";
import {LoadingComponent} from "../../common";
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import {
    getOrders,
    getProducts,
    getRequest,
    postPrice,
    postRequest,
    updateProductItems,
    updateRequestForm,
} from "../../actions";

const ProductItem = (props) => {

    return (
        <Col>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.item.image_url} style={{ width: '200px', height: '200px' }} className="ml-5 mt-4" />
                <Card.Body>
                    <Card.Title>{props.item.name} ({props.item.product_type})</Card.Title>
                    {/* <Button variant="primary" onClick={() => { setCount(count + 1); props.onProductItemClick(props.item, count); } } >Agregar</Button> */}
                    <Button variant="primary" onClick={props.onPlusProduct} data-product={props.item.id} >  + </Button>
                    <Button variant="secondary" onClick={props.onMinusProduct} data-product={props.item.id} > - </Button>
                    <p>{props.item.quantity}</p>
                </Card.Body>
            </Card>
        </Col>
    );
}


class RequestForm extends React.Component {
    constructor(props) {
        super(props);
        this.onFormPlusProduct = this.onFormPlusProduct.bind(this);
        this.onFormMinusProduct = this.onFormMinusProduct.bind(this);
        this.onLocalFormChange = this.onLocalFormChange.bind(this);
        this.onFormRequestSubmit = this.onFormRequestSubmit.bind(this);
    }

    onFormPlusProduct(e){
        const productId = e.target.dataset.product;
        const { products } = this.props;
        const [ product ] = products.filter( item => item.id === parseInt( productId ) );
        if (product.quantity >= 0) {
            const newProduct = { ...product, quantity: product.quantity + 1 };
            let newProducts = products.filter(p => p.id !== newProduct.id).concat(newProduct);
            newProducts = newProducts.sort((p1, p2) => (p1.id < p2.id) ? -1 : 1);
            this.props.dispatch(updateProductItems(newProducts));
            const priceRequest = { products: newProducts.map(product => { return { quantity: product.quantity, product_type: product.product_type, id: product.id } }) }
            this.props.dispatch(postPrice(priceRequest));
        }
    }

    onFormMinusProduct(e){
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

    onLocalFormChange(e){
        e.preventDefault();
        const { name, value } = e.target;
        const newRequestForm = { ...this.props.requestForm, ...{ [name]: value } };
        this.props.dispatch(updateRequestForm(newRequestForm));
    }

    onFormRequestSubmit(e){
        e.preventDefault();
        const { requestForm: payload } = this.props;
        const { products } = this.props;
        const items = products.map((product) => { return { product: product.id, quantity: product.quantity } });
        payload.items = items;
        this.props.postRequest(payload);
        // Here comes the redirection to order view
    }

    componentDidMount() {
        const { match } = this.props;
        const id = match && match.params && match.params.requestId ? match.params.requestId : -1;
        if (id > 0) {
             this.props.getRequest(id);
        } else {
            this.props.getProducts();
        }
    }

    render(){
        const { match } = this.props;
        const id = match && match.params && match.params.requestId ? match.params.requestId : -1;
        let { onRequestSubmit,
              products,
              requestForm,
              onFormChange,
              onPlusProduct,
              onMinusProduct,
              price } = this.props;

        onRequestSubmit = onRequestSubmit ? onRequestSubmit: this.onFormRequestSubmit;
        onPlusProduct = onPlusProduct ? onPlusProduct : this.onFormPlusProduct;
        onMinusProduct = onMinusProduct ? onMinusProduct : this.onFormMinusProduct;
        onFormChange = onFormChange ? onFormChange : this.onLocalFormChange;

        const { start_date, end_date, city, repeat, user, address, address2 } = requestForm ? requestForm:Object.assign({});
        return (
            <Container className="request-view">
                <Form onSubmit={onRequestSubmit}>
                    <Row>
                        {products.map((product) => {
                            return <ProductItem key={product.id} item={product} amount={product.quantity} onPlusProduct={onPlusProduct} onMinusProduct={onMinusProduct} />
                        })}
                    </Row>
                    <Row>
                        <Col className="text-right mt-5">
                            <h3> Total: $ {price}</h3>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col>
                            <Form.Group controlId="formStartDate">
                                <Form.Label>Salida</Form.Label>
                                <Form.Control type="datetime-local" name="start_date" value={start_date} placeholder="Fecha de inicio de envío" onChange={onFormChange} />
                                {/* <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text> */}
                            </Form.Group>

                            <Form.Group controlId="formEndDate">
                                <Form.Label>Llegada</Form.Label>
                                <Form.Control type="datetime-local" name="end_date" value={end_date} placeholder="Fecha final de envío" onChange={onFormChange} />
                                {/* <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text> */}
                            </Form.Group>
                            <Form.Control type="hidden" name="user" value={user} placeholder="Coloque dirección de llegada" onChange={onFormChange} />
                            <Form.Control type="hidden" name="repeat" value={repeat} placeholder="Coloque dirección de llegada" onChange={onFormChange} />
                            <Form.Control type="hidden" name="city" value={city} placeholder="Coloque dirección de llegada" onChange={onFormChange} />

                        </Col>
                        <Col>
                            <Form.Group controlId="formAdress1">
                                <Form.Label>Desde</Form.Label>
                                <Form.Control type="text" name="address" value={address} placeholder="Coloque dirección de salida" onChange={onFormChange} />
                                {/* <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text> */}
                            </Form.Group>

                            <Form.Group controlId="formAdress2">
                                <Form.Label>Hasta</Form.Label>
                                <Form.Control type="text" name="address2" value={address2} placeholder="Coloque dirección de llegada" onChange={onFormChange} />
                                {/* <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text> */}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit"> Submit </Button>
                </Form>
            </Container>
    );
    }

}

const LoadingForm = LoadingComponent(RequestForm);

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
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
        getRequest,
        getProducts,
        getOrders,
        postRequest,
        postPrice,
        dispatch
    },
    dispatch)

export default connect(mapState, mapDispatchToProps)(LoadingForm);
