import {MdDelete} from "react-icons/md";
import img from "../static/images/product/small-size/5.jpg";
import {Link} from "react-router-dom";
import {GoChevronDown, GoChevronUp} from "react-icons/go";
import {useState} from "react";
import {Form, Image} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {addToCart, removeFormCart, removeFromWishlist} from "../../actions/cartActions";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function WishlistTable({items}) {
    return (
        <Form>
            <div className="table-content table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th className="li-product-remove">remove</th>
                        <th className="li-product-thumbnail">images</th>
                        <th className="cart-product-name">Product</th>
                        <th className="li-product-price">Price</th>
                        <th className="li-product-quantity">Quantity</th>
                        <th className="li-product-subtotal">Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map(item => {
                        return (
                            <TableItem key={item.product} item={item} />
                        )
                    })}


                    </tbody>
                </table>
            </div>
        </Form>
    )
}

function TableItem({item}) {
    const dispatch = useDispatch()

    const addToCartHandler = (e) => {
        e.preventDefault()
        dispatch(addToCart(item.product, 1))
    }

    const removeFromCartHandler = () => {
        dispatch(removeFromWishlist(item.product))
    }

    return (
        <tr>
            <td className="li-product-remove">
                <MdDelete onClick={removeFromCartHandler} className='product-remove-icon'/>
            </td>
            <td className="li-product-thumbnail">
                <Image
                    src={item.image} height='80px' alt="Li's Product Image"
                />
            </td>
            <td className="li-product-name"><Link to={`/product/${item.product}`}>{item.name}</Link></td>
            <td className="li-product-price"><span className="amount">$ {item.price}</span></td>
            <td className="li-product-stock-status"><span className={item.countInStock > 0 ? 'in-stock': 'out-stock'}>{item.countInStock > 0 ? 'In stock': 'Out stock'}</span></td>
            <td className="li-product-add-cart"><button onClick={addToCartHandler} style={{padding:'12px 36px'}} className='my_button-md'>add to cart</button></td>

        </tr>
    )
}

export default WishlistTable