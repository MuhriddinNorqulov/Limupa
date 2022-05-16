import {Row, Col, Form} from "react-bootstrap";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";
import {saveShippingAddress} from "../../actions/cartActions";
import {useNavigate} from "react-router";

function Shipping () {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart


    const [name, setName] = useState(shippingAddress.name)
    const [number, serNumber] = useState(shippingAddress.number)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country, name, number}))

        navigate('/checkout/payment')
    }



    return (
        <Col lg={8} className='offset-lg-2'>
                <Form onSubmit={submitHandler}>
                    <div className="checkbox-form">
                        <h3>Shipping Information</h3>
                        <Row>

                            <Col lg={6}>
                                <div className="checkout-form-list">
                                    <label>Country <span className="required">*</span></label>
                                    <Form.Control
                                        type="text"
                                        value={country ? country: ''}
                                        placeholder='Enter Your Country'
                                        onChange={(e) => {
                                            setCountry(e.target.value)
                                        }}
                                    />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="checkout-form-list">
                                    <label>Address <span className="required">*</span></label>
                                    <Form.Control
                                        type="text"
                                        value={address ? address : ''}
                                        placeholder='Enter Your Address'
                                        onChange={(e) => {
                                            setAddress(e.target.value)
                                        }}
                                    />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="checkout-form-list">
                                    <label>City <span className="required">*</span></label>
                                    <Form.Control
                                        value={city ? city : ''}
                                        placeholder="Enter Your City..."
                                        type="text"
                                        onChange={(e) => {
                                            setCity(e.target.value)
                                        }}
                                    />
                                </div>
                            </Col>

                            <Col lg={6}>
                                <div className="checkout-form-list">
                                    <label>Postal Code <span className="required">*</span></label>
                                    <Form.Control
                                        value={postalCode ? postalCode : ''}
                                        placeholder="Enter Postal Code..."
                                        type="text"
                                        onChange={(e) => {
                                            setPostalCode(e.target.value)
                                        }}
                                    />
                                </div>
                            </Col>

                            <Col lg={6}>
                                <div className="checkout-form-list">
                                    <label>Full Name/First Name<span className="required">*</span></label>
                                    <Form.Control
                                        value={name ? name : ''}
                                        placeholder="Enter Your Name"
                                        type="text"
                                        onChange={(e) => {
                                            setName(e.target.value)
                                        }}
                                    />
                                </div>
                            </Col>

                            <Col lg={6}>
                                <div className="checkout-form-list">
                                    <label>Phone Number <span className="required">*</span></label>
                                    <Form.Control
                                        value={number? number: ''}
                                        placeholder="Enter Your Phone Number"
                                        type="text"
                                        onChange={(e) => {
                                            serNumber(e.target.value)
                                        }}
                                    />
                                </div>
                            </Col>

                            <Col lg={5} className='offset-lg-6' >
                                <button className='register-button mt-0 mb-2'>Next</button>
                            </Col>


                        </Row>

                    </div>

                </Form>
        </Col>

    )
}

export default Shipping