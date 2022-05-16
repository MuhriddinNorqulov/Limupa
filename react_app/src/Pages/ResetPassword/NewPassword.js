import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {resetPassword, savePhoneNumber} from "../../actions/userAction";
import {Col, Form, Row} from "react-bootstrap";
import {useLocation} from "react-router";
import {useNavigate} from "react-router";
import Message from "../components/Message";
import {RotatingLoader} from "../components/Loader";
import {RESET_PHONE_NUMBER, USER_RESET_PASSWORD_RESET} from "../../constants/userConstants";

function NewPassword() {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const userResetPassword = useSelector(state => state.userResetPassword)
    const {loading, success, error} = userResetPassword

    const phoneNumber = useSelector(state => state.phoneNumber)
    const {phone} = phoneNumber

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
        console.log('new password page..', location.state)

        if (success){
            dispatch({type: USER_RESET_PASSWORD_RESET})
            dispatch({type: RESET_PHONE_NUMBER})
            dispatch(savePhoneNumber(null))
            navigate('/login', {state:{redirect:'/'}, replace:true})
        }

        try{
            if (!location.state.confirmCode || phone === null || phone === ""){
                navigate('/password-reset/confirm-code')
            }
        }
        catch (err){
            navigate('/password-reset/confirm-code')
        }
    }, [success])

    return(

            loading ? <RotatingLoader/>
                : <Form onSubmit={submitHandler}>
                    <div className="login-form">
                        <h4 className="login-title">New Password</h4>
                        <Row>
                            <Col lg={12} className="mb-20">
                                {error && <Message variant='error'>{error}</Message>}
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

export default NewPassword