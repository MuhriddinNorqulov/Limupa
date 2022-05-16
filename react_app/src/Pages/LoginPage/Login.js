import {Container, Row, Col, Form, Button} from "react-bootstrap";
import {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../actions/userAction";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../SigupPage/signup.css"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {useLocation} from "react-router";



function Login() {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const location = useLocation()

    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    const navigate = useNavigate()


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(phone, password))


    }

    useEffect(() => {
        console.log('this login page')
        if (!loading && userInfo) {
            try{
                navigate(location.state.redirect)
            }catch (err){
                navigate(-1)
            }
        }

    }, [loading])






    return (

        <>
            <Header />
            <Breadcrumb slug='Login' />
            <div className="page-section mb-60">
                <Container>
                    <Row>
                        <Col lg={6} md={8} sm={12} className='offset-lg-3 offset-md-2 mt-3'>
                            {loading && <Loader />}
                            {loading ? <></>
                                : <Form onSubmit={submitHandler}>
                                    <div className="login-form">
                                        <h3 className="login-title">Login</h3>
                                        {error && <Message variant='error'>{error}</Message>}

                                        <Row>
                                            <Col md={12} sm={12} className="mb-20">
                                                <Form.Group controlId='email'>
                                                    <label>Phone Number*</label>
                                                    <PhoneInput
                                                        country={'uz'}
                                                        value={phone}
                                                        onChange={(number) => setPhone(number) }
                                                    />

                                                </Form.Group>

                                            </Col>
                                            <Col sm={12} className="mb-20">
                                                <Form.Group>
                                                    <label>Password</label>
                                                    <Form.Control
                                                        onChange={(e) => {
                                                            setPassword(e.target.value)
                                                        }}
                                                        className="mb-0"
                                                        type="password"
                                                        placeholder="Password"
                                                    />
                                                </Form.Group>

                                            </Col>
                                            <Col md={4}>
                                                <div className="check-box d-inline-block ml-0 ml-md-2 mt-10">
                                                    <input type="checkbox" id="remember_me" />
                                                    <label htmlFor="remember_me">Remember me</label>
                                                </div>
                                            </Col>

                                            <Col md={4} className="mt-10 mb-20 text-left text-md-right">
                                                <Link to='/signup'>Sign Up</Link>
                                            </Col>
                                            <Col md={4} className="mt-10 mb-20 text-left text-md-right">
                                                <Link to='/password-reset'> Forgotten password?</Link>
                                            </Col>
                                            <Col md={12}>
                                                <button type='submit' className="register-button mt-0">Login</button>
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

export default Login