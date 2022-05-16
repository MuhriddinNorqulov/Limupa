import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {savePhoneNumber, send_verification_code} from "../../actions/userAction";
import {Col, Form, Row} from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import {useNavigate} from "react-router";
import {RotatingLoader} from "../components/Loader";
import Message from "../components/Message";
import {USER_SEND_VERIFICATION_CODE_RESET} from "../../constants/userConstants";

function PhoneNumber(){
    const [phone, setState] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userSendVerificationCode = useSelector(state => state.userSendVerificationCode)
    const {loading, success, error} = userSendVerificationCode

    const sendCodeHandler = (e) => {
        e.preventDefault()
        dispatch(send_verification_code(phone, 'reset-password'))
    }

    useEffect(() => {

        if(success){
            dispatch({type: USER_SEND_VERIFICATION_CODE_RESET})
            dispatch(savePhoneNumber(phone))
            navigate('/password-reset/confirm-code', {state: {sendCode: true}})
        }
    },[success])


    return(
        loading ? <RotatingLoader />
            :<Form onSubmit={sendCodeHandler}>
                <div className="login-form">
                    <h4 className="login-title">Forgotten Password?</h4>
                    <Row>
                        {error && <Message variant='error'>{error}</Message>}
                        <Col lg={12} className="mb-20">
                            <Form.Group>
                                <label>Phone Number</label>
                                <p>an SMS will be sent to the entered number</p>
                                <PhoneInput
                                    country={'uz'}
                                    value={phone}
                                    onChange={e => setState(e)}
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



export default PhoneNumber