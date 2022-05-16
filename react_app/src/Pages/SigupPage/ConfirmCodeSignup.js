import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import {Container, Row, Col, Form} from "react-bootstrap";
import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../../actions/userAction";
import {RotatingLoader} from "../components/Loader";
import Message from "../components/Message";
import {USER_CHECK_CODE_RESET, USER_LOGOUT, USER_SEND_VERIFICATION_CODE_RESET} from "../../constants/userConstants";


function ConfirmCodeSignup() {

    const [code, setCode] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const {loading, error, success} = userRegister

    const submitHandler  = (e) => {
        e.preventDefault()
        dispatch(register(
            location.state.name,
            location.state.phone,
            location.state.password,
            code
        ))
    }


    useEffect(() => {
        console.log('confirm code signup')
        if(success){

            navigate('/login', {state:{redirect: '/'}, replace:true})
        }
        try{
            console.log(location.state , '/////////////////')
            if(!location.state.successSendCode || !location.state.phone || !location.state.password){
                navigate('/signup')
            }
        }catch (err){
            navigate('/signup')
        }

    }, [success]);

    return (
        <>
            <Header />
            <Breadcrumb slug='Confirm Verification Code' />
            <Container>
                <Row>
                    <Col lg={6} md={8} sm={12} className='offset-lg-3 offset-md-2'>
                        {loading ? <RotatingLoader/>
                            : <Form onSubmit={submitHandler}>
                                <div className='login-form'>
                                    <Row>
                                        <Col md={12}>
                                            {error && <Message variant='error'>{error}</Message>}
                                            <Form.Group>
                                                <label>Verification Code</label>
                                                <Form.Control
                                                    type='text'
                                                    placeholder='Enter Verification Code'
                                                    onChange={(e) => {
                                                        setCode(e.target.value)
                                                    }
                                                    }

                                                />

                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <button type='submit' className="register-button mt-0">Send</button>
                                        </Col>
                                    </Row>
                                </div>
                            </Form>
                        }
                    </Col>
                </Row>
            </Container>

            <Footer />
        </>
    )
}

export default ConfirmCodeSignup