import {MdDelete} from "react-icons/md";
import img from "../static/images/product/small-size/5.jpg";
import {Link} from "react-router-dom";
import {GoChevronDown, GoChevronUp} from "react-icons/go";
import {useState} from "react";
import {Form, Image} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {addToCart, removeFormCart} from "../../actions/cartActions";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function CartTable({cartItems}) {
    return (
        <Form>
            <div className="table-content table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th className="li-product-remove">remove</th>
                        <th className="li-product-thumbnail">images</th>
                        <th className="cart-product-name">Product</th>
                        {/*<th className="li-product-price">Price</th>*/}
                        <th className="li-product-quantity">Quantity</th>
                        <th className="li-product-subtotal">Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cartItems.map(item => {
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
    const [count, setCount] = useState(item.qty)

    const add = () => {
        if(count < item.countInStock) {
            setCount(count + 1)
            dispatch(addToCart(item.product, 1))
        }else {
            toast.warning("Mahsulot soni cheklangan")
        }

    }
    const reduce = () => {
        if (count > 1) {
            setCount(count - 1)
            dispatch(addToCart(item.product, -1))
        }
    }

    const changeCount = (e) => {


        const new_count = Number(e.target.value)
        if(new_count <= item.countInStock) {
            setCount(new_count)
            dispatch(addToCart(item.product, Number(new_count), true))
        }else {
            toast.warning('Mahsulot soni cheklangan', )
        }
    }

    const removeFromCartHandler = () => {

        dispatch(removeFormCart(item.product))
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
            {/*<td className="li-product-price"><span className="amount">$ {item.price}</span></td>*/}
            <td className="quantity">

                <div className="cart-plus-minus">
                    <input
                        onChange={(e) => changeCount(e)}
                        className="cart-plus-minus-box"
                        value={count} type="number"
                        min={1}
                    />
                    <div onClick={reduce} className="dec qtybutton">
                        <GoChevronDown />
                    </div>
                    <div onClick={add} className="inc qtybutton">
                        <GoChevronUp />
                    </div>
                </div>
            </td>
            <td className="product-subtotal"><span className="amount">$ {Math.round((item.price * item.qty) * 100)/100}</span></td>
        </tr>
    )
}

export default CartTable