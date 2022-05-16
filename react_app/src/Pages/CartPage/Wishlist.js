import {useSelector} from "react-redux";
import Header from "../components/Header";
import Breadcrumb from "../components/Breadcrumb";
import {Col, Container, Row} from "react-bootstrap";
import Message from "../components/Message";
import CartTable from "./CartTable";
import {Link} from "react-router-dom";
import Footer from "../components/Footer";
import WishlistTable from "./WishlistTable";


function Wishlist() {
    const wishlist = useSelector(state => state.wishlist)
    const {wishlistItems} = wishlist
    return(
        <>
            <Header />
            <Breadcrumb slug='Shopping-Cart' />
            <div className="Shopping-cart-area pb-60">
                <Container>
                    <Row>
                        <Col lg={10} sm={12} md={9} className='offset-lg-1'>
                            {wishlistItems.length === 0
                                ? <Message variant='error'>Your Cart is Empty</Message>
                                :

                                <WishlistTable items={wishlistItems} />

                            }
                        </Col>


                    </Row>
                </Container>
            </div>
            <Footer />
        </>
    )
}

export default Wishlist