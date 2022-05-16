import {Container, Row, Col, ListGroup, ListGroupItem} from "react-bootstrap";
import OrderCard from "../CheckoutPages/OrderCard";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getOrderDetail} from "../../actions/orderActions";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {useLocation} from "react-router-dom";
import {toast} from "react-toastify";

function OrderDetail() {
    const location = useLocation()
    const params = useParams()
    const orderId = params.id
    const dispatch = useDispatch()
    const orderDetail = useSelector(state => state.orderDetail)

    const {order, error, loading} = orderDetail



    useEffect(() => {

        if (!order || order._id !== Number(orderId)) {
            dispatch(getOrderDetail(orderId))
        }




    }, [dispatch, order, orderId])


    return (
        <>
            <Header />
        <Breadcrumb slug='Order Detail' />
        <Container>
            {loading
                ? <Loader />
                : error ? <Message variant='error'>{error}</Message>
                : <Row>
                    <Col lg={8}>
                        <h3 className='ms-5 text-center'>Order id:{order._id}</h3>
                        <ListGroup>
                            <ListGroupItem>
                                <h4 className='list-title'>Shipping Info</h4>

                                <p className='list-text'>
                                    <strong>Name:</strong>
                                    {order.user.name} <br/>
                                    <strong>Shipping Address:</strong>
                                    {order.shippingAddress.country}, {order.shippingAddress.city}, {order.shippingAddress.address}, {order.shippingAddress.postalCode} <br/>
                                    <strong>Customer: </strong>
                                    {order.shippingAddress.name} , {order.shippingAddress.number} <br/>
                                    {order.isDelivered
                                        ? <Message variant='success'>Delivered</Message>
                                        : <Message variant='error'>Not Delivered</Message>
                                    }
                                </p>
                            </ListGroupItem>
                            <ListGroupItem>
                                <h4 className='list-title'>Payment Method</h4>

                                <p className='list-text'>
                                    <strong>Method:</strong>
                                    {order.paymentMethod} <br/>
                                    {order.isPaid
                                        ? <Message variant='success'>Paid</Message>
                                        : <Message variant='error'>Not Paid</Message>
                                    }

                                </p>
                            </ListGroupItem>

                        </ListGroup>
                        <OrderCard cartItems={order.orderItems} />
                    </Col>
                    <Col lg={4}>
                        <div className="your-order">
                            <h3 className='text-center'>Order Summary</h3>
                            <div className="your-order-table table-responsive">
                                <table className="table">

                                    <tbody>
                                    <tr className="cart-subtotal">
                                        <th>Subtotal</th>
                                        <td><span className="amount">$ {order.subtotal}</span></td>
                                    </tr>
                                    <tr className="cart-subtotal">
                                        <th>Shipping</th>
                                        <td><span className="amount">Free</span></td>
                                    </tr>
                                    <tr className="cart-subtotal">
                                        <th>Coupon Code</th>
                                        <td><span className="amount">-$15.00</span></td>
                                    </tr>
                                    <tr className="order-total">
                                        <th>Order Total</th>
                                        <td><strong><span className="amount">$ {order.total_price}</span></strong></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/*<div className="order-button-payment">*/}
                            {/*    <input className='btn-black-hover' value="Place order" type="submit" />*/}
                            {/*</div>*/}


                        </div>
                    </Col>
                </Row>
            }
        </Container>
            <Footer />
        </>
    )
}

export default OrderDetail