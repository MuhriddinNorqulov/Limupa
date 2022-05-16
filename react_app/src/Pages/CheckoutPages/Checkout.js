import {Link, Outlet} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import OrderCard from "./OrderCard";
import Breadcrumb from "../components/Breadcrumb";
import CheckoutSteps from "./CheckoutSteps";
import {useEffect} from "react";
import {useNavigate} from "react-router";
import {useLocation} from "react-router-dom";
import {steps} from "./CheckoutSteps";
import './checkout.css'
import Header from "../components/Header";
import Footer from "../components/Footer";
import {useSelector} from "react-redux";
function Checkout() {

    const location = useLocation()
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    const index = steps.find(item => item.slug === location.pathname)
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }

        if (cartItems.length === 0){
            navigate('/cart')
        }
    },[userInfo])
    return (
        <>
            <Header />
            <Breadcrumb slug={'Checkout'} />
            <CheckoutSteps index={index ? index.number : 2} />
            <Container>

                <Row>

                    <Outlet />


                </Row>
            </Container>
            <Footer />
        </>

    )
}

export default Checkout