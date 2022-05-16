import {Link} from "react-router-dom";
import {RatingStar} from "./ProductCard";
import {Image} from "react-bootstrap";
import {FaEye, FaRegHeart} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {addToCart, addToWishlist} from "../../actions/cartActions";


function ProductLIstItem({product}) {
    const dispatch = useDispatch()
    const addToCartHandler = () => {
        dispatch(addToCart(product._id, 1))
    }

    const addToWishlistHandler = () => {
        console.log(product)
        dispatch(addToWishlist(product._id))
    }

    return (
        <div className="row product-layout-list">
            <div className="col-lg-3 col-md-5 ">
                <div className="product-image image-size">
                    <Image className='product-image-size' src={product.image} />
                </div>

            </div>
            <div className="col-lg-5 col-md-7">
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
                        <h4><Link to='/' className="product_name">{product.name}</Link>
                        </h4>
                        <div className="price-box">
                            <span className="new-price">${product.price}</span>
                        </div>
                        <p>{product.description.substring(0, 200)} ...</p>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="shop-add-action mb-xs-30">
                    <ul className="add-actions-link">
                        <li onClick={addToCartHandler} className="add-cart add-cart__button text-center">Add to cart</li>
                        <li onClick={addToWishlistHandler} className="wishlist"><div><FaRegHeart /><div className='tspan__text'>Add to wishlist</div></div></li>
                        <li className="wishlist"><div><FaEye /><div className='tspan__text'>Quick view</div></div></li>



                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProductLIstItem