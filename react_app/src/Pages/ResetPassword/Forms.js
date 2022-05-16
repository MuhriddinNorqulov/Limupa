import {Col, Form, Row} from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {checkCode, resetPassword, send_verification_code} from "../../actions/userAction";
import {toast} from "react-toastify";


export function PhoneNumberForm(){
    const [phone, setState] = useState('')
    const dispatch = useDispatch()

    const sendCodeHandler = (e) => {
        e.preventDefault()
        dispatch(send_verification_code(phone, 'reset-password'))
    }


    return(
        <Form onSubmit={sendCodeHandler}>
            <div className="login-form">
                <h4 className="login-title">Forgotten Password?</h4>
                <Row>
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



export function VerificationCodeForm() {
    const dispatch = useDispatch()
    const [code, setCode] = useState('')
    const checkCodeHandler = (e) => {
        e.preventDefault()
        dispatch(checkCode(code))
    }


    return(
        <Form onSubmit={checkCodeHandler}>
            <div className="login-form">
                <h4 className="login-title">Confirm Code</h4>
                <Row>
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

export function NewPasswordForm({phone}) {
    const dispatch = useDispatch()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()

        if (password === confirmPassword){
            if (password.length < 6){
                toast.error('Short password')
            }else {dispatch(resetPassword(phone, password))}
        }
        else {toast.error("Confirmation password error")}
    }

    useEffect(() => {
        console.log(phone)
    }, [])

    return(
        <Form onSubmit={submitHandler}>
            <div className="login-form">
                <h4 className="login-title">New Password</h4>
                <Row>
                    <Col lg={12} className="mb-20">
                        <Form.Group>
                            <label>Password</label>
                            <Form.Control
                                className="mb-0"
                                type="password"
                                placeholder="Enter Verification Code"
                                required
                                onChange={
                                  (e) => setPassword(e.target.value)
                                }
                            />


                        </Form.Group>
                    </Col>
                    <Col lg={12} className="mb-20">
                        <Form.Group>
                            <label>Confirm Password</label>
                            <Form.Control
                                className="mb-0"
                                type="password"
                                placeholder="Enter Verification Code"
                                required
                                onChange={
                                  (e) => setConfirmPassword(e.target.value)
                                }

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