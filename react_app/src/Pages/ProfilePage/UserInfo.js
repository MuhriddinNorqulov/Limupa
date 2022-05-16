import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {getUserDetail, updateUserProfile} from "../../actions/userAction";
import {USER_UPDATE_PROFILE_RESET} from "../../constants/userConstants";
import Message from "../components/Message";
import Loader, {RotatingLoader} from "../components/Loader";
import {Col, Form, Row} from "react-bootstrap";


function UserInfo() {
    const [name, setName] = useState('')

    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile


    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()

        if (password1 !== password2) {
            setMessage("Password do not match")
        } else {
            dispatch(updateUserProfile({
                'id': user.id,
                'name': name,
                'password': password1
            }))
        }
    }

    useEffect(() => {

        if (!userInfo) {
            navigate('/login')
        } else {

            if (!user || !user.phone || success) {
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetail('profile'))
            } else {
                setName(user.name)
            }

        }

    }, [dispatch, userInfo, user, success]);

    return (
        <>
            {message && <Message variant='error'>{message}</Message>}
            {error && <Message variant='error'>{error}</Message>}
            {loading ? <RotatingLoader />
                : <Form onSubmit={submitHandler}>
                    <div className="checkbox-form">
                        <h3>Profile</h3>
                        <Row>

                            <Col md={12}>
                                <div className="checkout-form-list">
                                    <label>Name <span className="required">*</span></label>
                                    <Form.Control
                                        type="text"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value)
                                        }}
                                    />
                                </div>
                            </Col>
                            <Col md={12}>
                                <div className="checkout-form-list">
                                    <label>Phone <span className="required">*</span></label>
                                    <Form.Control
                                        type="number"
                                        value={user.phone}
                                        disabled
                                    />
                                </div>
                            </Col>
                            <Col md={12}>
                                <div className="checkout-form-list">
                                    <label>New Password <span className="required">*</span></label>
                                    <Form.Control
                                        placeholder="Enter new password..."
                                        type="password"
                                        onChange={(e) => {
                                            setPassword1(e.target.value)
                                        }}
                                    />
                                </div>
                            </Col>
                            <Col md={12}>
                                <div className="checkout-form-list">
                                    <label>Confirm Password <span className="required">*</span></label>
                                    <Form.Control
                                        placeholder="Confirm password..."
                                        type="password"
                                        onChange={(e) => {
                                            setPassword2(e.target.value)
                                        }}

                                    />
                                </div>
                            </Col>

                            <Col lg={3}>
                                <button type='submit' className='register-button mt-0 mb-2'>Submit</button>

                            </Col>


                        </Row>

                    </div>
                </Form>
            }
        </>
    )
}

export default UserInfo

