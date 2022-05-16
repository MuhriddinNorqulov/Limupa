import {Button, Col, Row} from "react-bootstrap";
import {Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../Pages/components/Loader";
import {useEffect} from "react";
import {Link} from 'react-router-dom'
import {ImCancelCircle} from 'react-icons/im'
import {GiCheckMark} from "react-icons/gi";
import Message from '../../Pages/components/Message'
import {listUsers} from "../../actions/userAction";
import {MdOutlineModeEditOutline, MdDelete} from 'react-icons/md'
import {useNavigate} from "react-router-dom";
import {listProducts} from "../../actions/productActions";
import {deleteProduct} from "../../actions/productActions";
import {toast} from "react-toastify";


function ProductList() {

    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loading: loadingDelete ,success: successDelete, error: errorDelete} = useSelector(state => state.productDelete)

    useEffect(() => {

        dispatch(listProducts())

    }, [dispatch, successDelete, errorDelete]);


    const deleteHandler = (id) => {
        if (window.confirm('product delete?'))
        dispatch(deleteProduct(id))

    }





    return (
        <Container>
            <Row>
                <Col lg={12}>

                    {loading
                        ? <Loader />
                        : error ? <Message variant='danger'>{error}</Message>
                            : <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">DataTables Example</h6>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                            <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Category</th>
                                                <th>Count In Stock</th>
                                                <th></th>
                                            </tr>
                                            </thead>

                                            <tbody>

                                            {products.map(product => {
                                                return(
                                                    <tr key={product._id} className="cart_item">
                                                        <td>{product._id}</td>
                                                        <td className='td-name'>{product.name}</td>
                                                        <td>$ {product.price}</td>
                                                        <td>{product.category}</td>
                                                        <td>{product.countInStock}</td>

                                                        <td>
                                                            <Link to={`/admin/product/${product._id}/edit`}>
                                                                <MdOutlineModeEditOutline id='md-edit-icon' className='edit-icons' />
                                                            </Link>


                                                            <MdDelete onClick={() => deleteHandler(product._id)} id='md-delete-icon' className='edit-icons' />


                                                        </td>
                                                    </tr>
                                                )
                                            })}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>





                    }

                </Col>
            </Row>


        </Container>
    )
}

export default ProductList