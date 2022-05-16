import img1 from "../static/images/product/large-size/2.jpg";
import {FaCartArrowDown, FaRegHeart, FaEye} from "react-icons/fa";
import {Link} from "react-router-dom";
import {Col, Image} from "react-bootstrap";
import {RatingStar} from "./ProductCard";
import {useDispatch} from "react-redux";
import {addToCart, addToWishlist} from "../../actions/cartActions";

function ProductGridItem({product}) {
    const dispatch = useDispatch()

    const addToWishlistHandler = () => {
        dispatch(addToWishlist(product._id))
    }

    const addToCartHandler = () => {
        dispatch(addToCart(product._id, 1))
    }

    return(
        <>
            <Col className='mb-3 cardmedia'>
                <Col lg={12}>
                    <div className="single-product-wrap">
                        <div className="product-image image-size">

                                {/*<img src={product.image} height="200px" alt="Li's Product Image" />*/}
                            <Image className='product-image-size' src={product.image} />

                            {/*<span className="sticker">New</span>*/}
                        </div>
                        <div className="product_desc">
                            <div className="product_desc_info">
                                <div className="product-review">
                                    <h5 className="manufacturer">
                                        <Link to='/'>Graphic Corner</Link>
                                    </h5>
                                    <div className="rating-box">
                                        <ul className="rating">
                                            <RatingStar num={product.rating} />
                                        </ul>
                                    </div>
                                </div>
                                <h4><Link className="product_name" to={`/product/${product._id}`}>{product.name}</Link></h4>
                                <div className="price-box">
                                    <span className="new-price">$ {product.price}</span>
                                    {/*<span className="old-price">$77.22</span>*/}
                                    {/*<span className="discount-percentage">-7%</span>*/}
                                </div>
                            </div>
                            <div className="add-actions">
                                <ul className="add-actions-link">
                                    <li onClick={addToCartHandler}><span className="links-details"><FaCartArrowDown /></span></li>
                                    <li onClick={addToWishlistHandler}><span className="links-details"><FaRegHeart /></span></li>
                                    <li><a className="quick-view" data-toggle="modal"
                                           data-target="#exampleModalCenter" href="#"><FaEye /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Col>
            </Col>
        </>
    )
}

export default ProductGridItem