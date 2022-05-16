import {ListGroup, ListGroupItem} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Col} from 'react-bootstrap'
import {useEffect} from "react";
import OrderCard from "./OrderCard";
import {useNavigate} from "react-router";
import Message from "../components/Message";
import {createOrder} from "../../actions/orderActions";
import {ORDER_CREATE_RESET} from "../../constants/orederConstants";
import {orderCart} from "../../actions/cartActions";
import {RotatingLoader} from "../components/Loader";

function PlaceOrder() {
    const cart = useSelector(state => state.cart)
    const {shippingAddress, cartItems, paymentMethod} = cart

    const orderCreate = useSelector(state => state.orderCreate)
    const {order, error, success, loading} = orderCreate

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cartItems,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod
        }))
    }


    useEffect(() => {
        if(!paymentMethod) {
            navigate('/checkout/payment')
        }

        if(success) {
            dispatch({type: ORDER_CREATE_RESET})
            navigate(`/order/${order._id}`, {state: {create: true}})
        }

    }, [success, paymentMethod]);


    return (
        <>
            <Col lg={8}>
                <h3 className='ms-5 text-center'>Place Order</h3>
                <ListGroup>
                    <ListGroupItem>
                        <h4 className='list-title'>Shipping Info</h4>

                        <p className='list-text'>
                            <strong>Shipping Address:</strong>
                            {shippingAddress.country} {shippingAddress.city} {shippingAddress.address} <br/>
                            <strong>Postal Code:</strong>
                            {shippingAddress.postalCode} <br/>
                            <strong>Customer: </strong>
                            {shippingAddress.name} , {shippingAddress.number}
                        </p>
                    </ListGroupItem>
                    <ListGroupItem>
                        <h4 className='list-title'>Payment Method</h4>

                        <p className='list-text'>
                            <strong>Method:</strong>
                            {paymentMethod} <br/>

                        </p>
                    </ListGroupItem>

                </ListGroup>
                <OrderCard cartItems={cartItems} />
            </Col>
            <Col lg={4}>
                <div className="your-order">
                    <h3 className='text-center'>Order Summary</h3>
                    <div className="your-order-table table-responsive">
                        <table className="table">

                            <tbody>
                            <tr className="cart-subtotal">
                                <th>Subtotal</th>
                                <td><span className="amount">${Math.round(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) *100)/100}</span></td>
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
                                <td><strong><span className="amount">$200.00</span></strong></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    {error && <Message variant='error'>{error}</Message>}
                    {loading ? <RotatingLoader/>
                        : <div className="order-button-payment">
                            <input onClick={placeOrder} className='btn-black-hover' value="Place order" type="submit"/>
                        </div>
                    }


                </div>
            </Col>

        </>
    )
}

export default PlaceOrder