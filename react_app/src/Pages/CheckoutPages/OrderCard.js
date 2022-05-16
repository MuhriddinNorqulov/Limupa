import {Link} from 'react-router-dom'
import {Image} from "react-bootstrap";


function OrderCard({cartItems}) {

    return (
        <div className="your-order" style={{background: "none", border: '1px solid #e5e5e5', marginBottom: '1rem'}}>
            <div className="your-order-table table-responsive">
                <h3 className='text-center'>Order Items</h3>
                <table className="table">
                    <thead>
                    <tr>
                        <th className='cart-product-name'>Image</th>
                        <th className="cart-product-name">Product</th>
                        <th className="cart-product-total">Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cartItems.map(item =>{
                        return (
                            <OrderItem key={item.name} item={item} />
                        )
                    })}


                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default OrderCard


const OrderItem = ({item}) => {
    const price = item.update !== undefined ? Math.round((item.price * item.qty) * 100)/100: item.price
    return (
        <tr className="cart_item">
            <td className='minicart-product-image'>
                <Image height='46px' src={item.image} />
            </td>
            <td className="cart-product-name"><Link to={`/product/${item.product}`}>{item.name}</Link><strong className="product-quantity"> ×
                {item.qty}</strong></td>
            <td className="cart-product-total"><span className="amount">$ {price}</span></td>
        </tr>
    )
}
