import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import {useEffect} from "react";
import {Link} from 'react-router-dom'
import {listMyOrders} from "../../actions/orderActions";
import {ImCancelCircle} from 'react-icons/im'
import {GiCheckMark} from "react-icons/gi";
import Message from '../components/Message'


function MyOrders() {
    const orderListMy = useSelector(state => state.orderListMy)
    const {loading, error, orders} = orderListMy
    const dispatch = useDispatch()


    useEffect(() => {

        dispatch(listMyOrders())

    }, []);


    return (
        <>
            <h3 className='text-center'>My Orders</h3>


            {loading
                ? <Loader />
                : error ? <Message variant='error'>{error}</Message>
                : <div className="your-order-table table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th className="cart-product-name">ID</th>
                            <th className="cart-product-total">Date</th>
                            <th className="cart-product-total">Total</th>
                            <th className="cart-product-total">Paid</th>
                            <th className="cart-product-total">Delivered</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map(order => (
                            <>
                            <tr className="cart_item">
                                <td className="cart-product-name">{order._id}</td>
                                <td className="cart-product-total">{(order.createdAt.substring(0, 20)).replace('T', ' / ')}</td>
                                <td className="cart-product-total">$ {order.total_price}</td>
                                <td className="cart-product-total">
                                    {order.isPaid
                                        ? <GiCheckMark color='#28a745' />
                                        : <ImCancelCircle color='#dc3545' />

                                    }
                                </td>
                                <td className="cart-product-total"><Link to={`/order/${order._id}`}><button className='my_button-md'>Detail</button></Link></td>
                            </tr>
                            </>
                        ))}


                        </tbody>

                    </table>
                </div>

            }

        </>
    )
}

export default MyOrders