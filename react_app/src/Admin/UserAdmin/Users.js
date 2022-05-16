import {Button, Col, Row} from "react-bootstrap";
import {Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../Pages/components/Loader";
import {useEffect} from "react";
import {Link} from 'react-router-dom'
import {ImCancelCircle} from 'react-icons/im'
import {GiCheckMark} from "react-icons/gi";
import Message from '../../Pages/components/Message'
import {deleteUser, listUsers} from "../../actions/userAction";
import {MdOutlineModeEditOutline, MdDelete} from 'react-icons/md'
import {useNavigate} from "react-router-dom";


function Users() {

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {success: successDelete} = useSelector(state => state.userDelete)


    useEffect(() => {

        dispatch(listUsers())

    }, [dispatch, successDelete]);


    const deleteHandler = (id) => {
        if (window.confirm('user delete?'))
        dispatch(deleteUser(id))
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
                                            {users.map(user => (

                                                <tr key={user.id} className="cart_item">
                                                    <td>{user.id}</td>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.is_staff ? <GiCheckMark  color='#28a745' />: <ImCancelCircle color='#dc3545' />}</td>
                                                    <td>{user.last_login ?
                                                        (user.last_login.substring(0, 19).replace('T', ' / '))
                                                        : <span>---</span>
                                                    }</td>

                                                    <td>
                                                        <Link to={`/admin/user/${user.id}/edit`}>
                                                            <MdOutlineModeEditOutline id='md-edit-icon' className='edit-icons' />
                                                        </Link>

                                                        <MdDelete onClick={()=>deleteHandler(user.id)} id='md-delete-icon' className='edit-icons' />

                                                    </td>
                                                </tr>


                                            ))}

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

export default Users