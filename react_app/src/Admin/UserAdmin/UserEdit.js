import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {getUserDetail, updateUser, updateUserProfile} from "../../actions/userAction";
import {USER_UPDATE_PROFILE_RESET, USER_UPDATE_RESET} from "../../constants/userConstants";
import Message from "../../Pages/components/Message";
import Loader from "../../Pages/components/Loader";
import {Col, Container, Form, Row, FormCheck} from "react-bootstrap";
import {useParams} from "react-router-dom";


function UserEdit() {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [isAdmin, setAdmin] = useState(false)



    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdate

    const params = useParams()
    const userId = params.id

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({id: user.id, name, email, isAdmin}))
        dispatch(getUserDetail(userId))
    }


    useEffect(() => {

        if (successUpdate) {
            dispatch({type: USER_UPDATE_RESET})
            navigate('/admin/users')
        }
        else {


            if (!user.email || user.id !== Number(userId)) {

                dispatch(getUserDetail(userId))
            } else {

                setName(user.name)
                setEmail(user.email)
                setAdmin(user.is_staff)

            }
        }



    }, [dispatch, user, userId, successUpdate, navigate]);

    return (
        <Container>
            <Row>
                <Col lg={6} className='offset-lg-3'>
                    {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                    {loadingUpdate ? <Loader />:
                        <>
                            {error && <Message variant='danger'>{error}</Message>}
                            {loading && <Loader />}
                            {!loading
                                ? <Form onSubmit={submitHandler}>
                                    <div className="checkbox-form">
                                        <h3>Edit User</h3>
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
                                                    <label>Email <span className="required">*</span></label>
                                                    <Form.Control
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => {
                                                            setEmail(e.target.value)
                                                        }}
                                                    />
                                                </div>
                                            </Col>

                                            <Col md={12}>
                                                <div className="checkout-form-list">
                                                    <Form.Control
                                                        id='remember_me'
                                                        type="checkbox"
                                                        style={{display: 'inline-block'}}
                                                        checked={isAdmin}
                                                        onChange={(e) => {
                                                            setAdmin(e.target.checked)
                                                        }}
                                                    />
                                                    <label style={{display: 'inline-block'}}>Admin</label>


                                                </div>
                                            </Col>



                                            <Col lg={3}>
                                                <button type='submit' className='register-button mt-0 mb-2'>Submit</button>

                                            </Col>



                                        </Row>

                                    </div>
                                </Form>
                                :<></>
                            }
                        </>
                        }

                </Col>
            </Row>
        </Container>
    )
}

export default UserEdit