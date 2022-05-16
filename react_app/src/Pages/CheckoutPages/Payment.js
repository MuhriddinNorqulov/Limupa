import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {orderCart, savePaymentMethod} from "../../actions/cartActions";
import {FormGroup, Form, Label, Input} from "reactstrap";
import {FormLabel} from "react-bootstrap";

function Payment() {
    const cart = useSelector(state => state.cart)
    const {shippingAddress, cartItems} = cart

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/checkout/shipping')
        }
    }, [shippingAddress]);


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        dispatch(orderCart(cartItems))

        navigate('/checkout/place-order')
    }

    const paymentOptions = ['PayPal', 'CreditCard']





    return (
        <Form onSubmit={submitHandler}>
            <FormLabel><h3>Select Method</h3></FormLabel>
            {paymentOptions.map(option => {
                return (
                    <FormGroup key={option} check>

                        <Input
                            required
                            className='payment-form-check'
                            value={option}
                            name='paymentMethod'
                            type="radio"
                            onChange={(e) => {
                                setPaymentMethod(e.target.value)
                            }}
                        />
                        <span className='check-label'>{option}</span>
                    </FormGroup>


                )
            })}
            <button className='btn register-button mt-0 mb-2'>Submit</button>

        </Form>
    )
}

export default Payment