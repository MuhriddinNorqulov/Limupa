import {Container, Row, Col, Form} from "react-bootstrap";
import Header from "../components/Header";
import 'react-phone-input-2/lib/style.css'
import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from "react";
import {RotatingLoader} from "../components/Loader";
import Message from "../components/Message";
import {Outlet, useNavigate} from "react-router";


import {
    USER_CHECK_CODE_RESET,
    USER_RESET_PASSWORD_RESET,
    USER_SEND_VERIFICATION_CODE_RESET
} from "../../constants/userConstants";



function PasswordReset() {

    const navigate = useNavigate()
    const dispatch = useDispatch()


    return(
        <>
            <Header />
            <div className="page-section mb-60">
                <Container>
                    <Row>
                        <Col lg={6} md={8} xs={12} className='offset-lg-3 offset-md-2'>
                            <Outlet />

                        </Col>
                    </Row>
                </Container>
            </div>


        </>
    )
}

export default PasswordReset