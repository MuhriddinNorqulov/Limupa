import ProductGridItem from "./ProductGridItem";
import axios from "axios";
import {useState, useEffect} from "react";
import {Container, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../../actions/productActions";
import Loader from "./Loader";
import Message from "./Message";
import Paginator from "./Paginator";
import {useLocation} from "react-router";
import {useSearchParams} from "react-router-dom";

function Products() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { error, loading, products, page, num_pages} = productList

    const location = useLocation()

    const [searchParams, setSearchParams] = useSearchParams()

    useEffect( () => {

        dispatch(listProducts(`${location.search}`))

        },
        [dispatch, searchParams]
    )

    return(
        <section className="product-area li-laptop-product pt-60 pb-45">
            <Container>
                {loading ? <Loader />
                    : error ? <Message variant="error">{error}</Message>
                        :(

                        <Row>
                            <Col lg={12}>
                                <div className="li-section-title">
                                    <h2>
                                        <span>Laptop</span>
                                    </h2>
                                    <ul className="li-sub-category-list">
                                        <li className="active"><a href="#">Prime Video</a></li>
                                        <li><a href="#">Computers</a></li>
                                        <li><a href="#">Electronics</a></li>
                                    </ul>
                                </div>
                                <Row className='d_grid'>
                                    {products.map(item => {
                                        return (
                                            <ProductGridItem key={item._id} product={item}/>
                                        )
                                    })}


                                </Row>
                            </Col>
                        </Row>
                        )
                }
                {loading ? '' :
                    < Paginator num_pages={num_pages} current={page} />
                }
                </Container>

         </section>
    )
}

export default Products