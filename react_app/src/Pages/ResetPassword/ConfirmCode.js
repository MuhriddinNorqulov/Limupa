import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from "react";
import {checkCode} from "../../actions/userAction";
import {Col, Form, Row} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router";
import {RotatingLoader} from "../components/Loader";
import Message from "../components/Message";
import {USER_CHECK_CODE_RESET, USER_SEND_VERIFICATION_CODE_RESET} from "../../constants/userConstants";

export function ConfirmCode() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [code, setCode] = useState('')


    const location = useLocation()


    const userCheckCode = useSelector(state => state.userCheckCode)
    const {loading, success, error} = userCheckCode

    const phoneNumber = useSelector(state => state.phoneNumber)
    const {phone} = phoneNumber



    const checkCodeHandler = (e) => {
        e.preventDefault()
        dispatch(checkCode(code))
    }

    useEffect(() => {
        console.log('confirm code page..', location.state)

        if (success){
            dispatch({type: USER_CHECK_CODE_RESET})
            navigate('/password-reset/new-password', {state: {confirmCode: true}})
        }
        try {
            if(!location.state.sendCode || phone === null || phone === ""){
                navigate('/password-reset')
            }
        }catch (err){
            navigate('/password-reset')
        }
    },[success])


    return(
        loading ? <RotatingLoader />
        :<Form onSubmit={checkCodeHandler}>
            <div className="login-form">
                <h4 className="login-title">Confirm Code</h4>
                <Row>
                    {error && <Message variant='error'>{error}</Message>}
                    <Col lg={12} className="mb-20">
                        <Form.Group>
                            <label>Verification code</label>
                            <p>an SMS will be sent to the entered number</p>
                            <Form.Control
                                className="mb-0"
                                type="text"
                                placeholder="Enter Verification Code"
                                required
                                onChange={(e) => setCode(e.target.value)}

                            />

                        </Form.Group>


                    </Col>

                    <Col sm={12}>
                        <button type='submit' className="register-button mt-0 mb-5">send</button>
                    </Col>
                </Row>
            </div>
        </Form>
    )
}

export default ConfirmCode
