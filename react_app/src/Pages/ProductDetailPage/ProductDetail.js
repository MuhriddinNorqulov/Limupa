import img1 from '../static/images/product/large-size/1.jpg'
import Breadcrumb from "../components/Breadcrumb";
import {RatingStar} from "../components/ProductCard";
import {useEffect, useState} from "react";
import {useParams, Link, Outlet} from "react-router-dom";
import {Container, Image, Row, Col, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {listProductDetails} from "../../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {GoChevronDown, GoChevronUp} from 'react-icons/go'
import {Form, FormControl, FormText} from "react-bootstrap";
import Info from "./Info";
import {addToCart} from "../../actions/cartActions";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Reviews from './Reviews'
import {NavLink} from "react-router-dom";


function ProductDetail() {
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails
    const params = useParams()
    const [count, setCount] = useState(1)



    const countPlus = () => {
        if (count < product.countInStock) {
            setCount(count+1)
        }
    }
    const countMinus = () => {
        if (count > 1){
            setCount(count-1)
        }
    }

    const addToCartHandler = (e) => {
        e.preventDefault()
        dispatch(addToCart(product._id, count))
    }


    useEffect( () => {
            dispatch(listProductDetails(params.id))
          window.scrollTo(0,0)
        },
        []
    )
    return (
        <>
            <Header />
            <Breadcrumb slug='Single Product' />
            <div className="content-wraper">
                <Container>
                    {loading ? <Loader />
                    :error
                        ? <Message variant="error">{error}</Message>
                            :(
                                <>
                                <Row className="single-product-area">
                                    <Col lg={5} md={6}>

                                        <div className="product-details-left">
                                            <div className="product-details-images slider-navigation-1">
                                                <div className="lg-image">
                                                    <a className="popup-img venobox vbox-item"
                                                       href='#' data-gall="myGallery">
                                                        <Image src={product.image} alt="product image" />
                                                    </a>
                                                </div>

                                            </div>

                                        </div>
                                    </Col>

                                    <Col lg={7} md={6}>
                                        <div className="product-details-view-content pt-60">
                                            <div className="product-info">
                                                <h2>{product.name}</h2>

                                                <div className="rating-box pt-20">
                                                    <ul className="rating rating-with-review-item">
                                                        <RatingStar num={product.rating} />
                                                        <li className="review-item"><a href="#">Read Review</a></li>
                                                        <li className="review-item"><a href="#">Write Review</a></li>
                                                    </ul>
                                                </div>
                                                <div className="price-box pt-20">
                                                    <span className="new-price new-price-2">$ {product.price}</span>
                                                </div>
                                                <div className="product-desc">
                                                    <p>
                                                        <span>{product.description}</span>
                                                    </p>
                                                </div>

                                                <div className="single-add-to-cart">
                                                    {
                                                        product.countInStock > 0
                                                            ?  <Form method='' onSubmit={(e) => addToCartHandler(e)}
                                                                     className="cart-quantity">
                                                                <div className="quantity">
                                                                    <label>Quantity</label>
                                                                    <div className="cart-plus-minus">
                                                                        <input
                                                                            value={count}
                                                                            name='qty'
                                                                            type='number'
                                                                            className="cart-plus-minus-box"
                                                                            min={1}
                                                                            onChange={(e) => setCount(e.target.value)}
                                                                        />
                                                                        <div onClick={countMinus} className="dec qtybutton"><GoChevronDown /></div>
                                                                        <div onClick={countPlus} className="inc qtybutton"><GoChevronUp /></div>
                                                                    </div>
                                                                </div>
                                                                <button className="add-to-cart" type="submit">Add to cart</button>


                                                            </Form>
                                                            : <p className='text-danger'>Not in Stock</p>
                                                    }

                                                </div>
                                                <Info />
                                            </div>
                                        </div>
                                    </Col>

                                </Row>

                                <div className="product-area pt-35">
                                    <Container>
                                        <Row>
                                            <Col lg={12}>
                                                <div className="li-product-tab">
                                                    <ul className="nav li-product-menu">
                                                        <li><NavLink to='review'><span>Description</span></NavLink></li>
                                                        <li><NavLink to='detail'><span>Product Details</span></NavLink>
                                                        </li>
                                                        <li><NavLink to='/'><span>Reviews</span></NavLink></li>
                                                    </ul>
                                                </div>

                                            </Col>
                                        </Row>
                                        <Outlet />

                                    </Container>
                                </div>
                                </>
                            )
                    }

                </Container>
            </div>
            <Footer />
        </>
    )
}

export default ProductDetail