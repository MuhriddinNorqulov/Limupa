import {Row, Col, Container} from 'react-bootstrap'
import Breadcrumb from "../components/Breadcrumb";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import CartTable from "./CartTable";
import Message from "../components/Message";
import Header from "../components/Header";
import Footer from "../components/Footer";
import './Cart.css'

function Cart() {
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    return (
        <>
            <Header />
            <Breadcrumb slug='Shopping-Cart' />
            <div className="Shopping-cart-area pb-60">
                <Container>
                    <Row>
                        <Col lg={9} sm={12} md={9}>
                        {cartItems.length === 0
                        ? <Message variant='error'>Your Cart is Empty</Message>
                            :

                                <CartTable cartItems={cartItems} />


                        }
                        </Col>

                        <Col lg={3} md={3} sm={12} className='mt-lg-0 mt-md-0 mt-3'>
                            <div>
                                <div className="cart-page-total">
                                    <ul>
                                        <li><h2>Cart totals</h2></li>
                                        <li>Total Count <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span></li>
                                        <li>Subtotal <span>$ {Math.round(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) *100)/100}</span></li>
                                        <li>Total <span>$ {Math.round(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) *100)/100}</span></li>
                                    </ul>
                                    <Link className='btn-black-hover' to='/checkout'>Proceed to checkout</Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </>
    )
}

export default Cart