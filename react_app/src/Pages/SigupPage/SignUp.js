import {Row, Col, Container, Form} from 'react-bootstrap'
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {register, send_verification_code} from "../../actions/userAction";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";
import Loader, {RotatingLoader} from "../components/Loader";
import {USER_SEND_VERIFICATION_CODE_RESET} from "../../constants/userConstants";
import Message from "../components/Message";
import "./signup.css"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function SignUp() {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userSendVerificationCode = useSelector(state => state.userSendVerificationCode)

    const {loading: loadingSendCode, error: errorSendCode, success: successSendCode} = userSendVerificationCode

    const sendCode = (e) => {
        e.preventDefault()
        dispatch(send_verification_code(phone, 'signup'))
    }


    useEffect(() => {

        if (errorSendCode){
            toast.error(errorSendCode)
        }

        if (successSendCode){
            navigate('/signup/confirm-code', {state: {successSendCode: true, phone:phone, name:name, password: password1}, replace:true})
            dispatch({type: USER_SEND_VERIFICATION_CODE_RESET})

        }


    }, [errorSendCode, successSendCode])

    return (
        <>
            <Header />
            <Breadcrumb slug={'Sign Up'} />
        <div className="page-section mb-60">
            <Container>
                <Row>
                    <Col className='offset-lg-2 offset-md-1' md={10} lg={8} xs={12}>
                        {loadingSendCode ? <RotatingLoader />
                            :<Form onSubmit={sendCode}>
                                <div className="login-form">
                                    <h4 className="login-title">Register</h4>
                                    <Row>
                                        <Col md={6} xs={12} className="mb-20">
                                            <Form.Group>
                                                <label>First Name</label>
                                                <Form.Control
                                                    className="mb-0"
                                                    type="text"
                                                    placeholder="Enter Your Name"
                                                    required
                                                    value={name}
                                                    onChange={(e) => {
                                                        setName(e.target.value)
                                                    }}
                                                />
                                            </Form.Group>


                                        </Col>

                                        <Col md={6} xs={12} className='mb-20'>
                                            <Form.Group>
                                                <label>Phone Number</label>
                                                <PhoneInput
                                                    country={'uz'}
                                                    value={phone}
                                                    onChange={(number) => setPhone(number) }
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6} xs={12} className="mb-20">
                                            <Form.Group>
                                                <label>Password</label>
                                                <Form.Control
                                                    className="mb-0"
                                                    type="password"
                                                    placeholder="Enter Password"
                                                    required
                                                    onChange={(e) => {
                                                        setPassword1(e.target.value)
                                                    }}
                                                    value={password1}
                                                />
                                            </Form.Group>

                                        </Col>
                                        <Col md={6} xs={12} className="mb-20">
                                            <Form.Group>
                                                <label>Confirm Password</label>
                                                <Form.Control
                                                    className="mb-0"
                                                    type="password"
                                                    placeholder="Confirm Password"
                                                    required
                                                    onChange={(e) => {
                                                        setPassword2(e.target.value)
                                                    }}
                                                    value={password2}
                                                />
                                            </Form.Group>

                                        </Col>

                                        <Col sm={12}>
                                            <button type='submit' className="register-button mt-0">Register</button>
                                        </Col>
                                    </Row>
                                </div>
                            </Form>
                        }

                    </Col>
                </Row>
            </Container>
        </div>
            <Footer />
        </>
    )
}

export default SignUp