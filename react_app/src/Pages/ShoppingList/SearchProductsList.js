import Header from '../components/Header'
import Footer from '../components/Footer'
import {Container, Col, Row} from "react-bootstrap";
import Products from "../components/Products";
import ProductGridItem from "../components/ProductGridItem";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {listProducts} from "../../actions/productActions";
import {useSearchParams, useParams} from "react-router-dom";
import Paginator from "../components/Paginator";
import Breadcrumb from "../components/Breadcrumb";
import {GridView, ListView} from "./Views";
import {useLocation} from "react-router";
import Message from "../components/Message";

function SearchProductsList() {
    const dispatch = useDispatch()
    const [view, setView] = useState(null)
    const [active, setActive] = useState('list')
    const [col, setCol] = useState(10)
    const productList = useSelector(state => state.productList)

    const [searchParams, setSearchParams] = useSearchParams()

    const location = useLocation()


    const { error, loading, products, page, num_pages} = productList

    const categories = ['Notebook', 'Smartphone', 'Camera']

    const gridView = () => {
        setView(<GridView products={products} />)
        setActive('grid')
        setCol(9)
    }
    const listView = () => {
        setView(<ListView products={products} />)
        setActive('list')
        setCol(10)
    }

    useEffect( () => {

        dispatch(listProducts(`${location.search}`))

        }, [dispatch, searchParams]
    )

    return(
        <>
            <Header />
            <Breadcrumb slug='Search Results' />
            <div className="content-wraper pb-60">
                <Container>
                    <Row>

                        <Col lg={col} className='order-1 order-lg-2'>
                            <div className="shop-top-bar mb-30">
                                <div className="shop-bar-inner">
                                    <div className="product-view-mode">
                                        <ul className="nav shop-item-filter-list" role="tablist">
                                            <li role="presentation">
                                                <span onClick={listView} className={active === 'list'?'active': ''}>
                                                    <i className="fa fa-th-list"></i>
                                                </span>
                                            </li>
                                            <li role="presentation">
                                                <span onClick={gridView} className={active === 'grid'? 'active': ''}>
                                                    <i className="fa fa-th"></i>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="toolbar-amount">
                                        <span>Showing {page === '1' ? 1 : page * 2} to {page * 3} of {num_pages * 3}</span>
                                    </div>
                                </div>

                                <div className="product-select-box">
                                    <div className="product-short">
                                        <p>Sort By:</p>
                                        <select className="nice-select">
                                            <option value="trending">Relevance</option>
                                            <option value="sales">Name (A - Z)</option>
                                            <option value="sales">Name (Z - A)</option>
                                            <option value="rating">Price (Low &gt; High)</option>
                                            <option value="date">Rating (Lowest)</option>
                                            <option value="price-asc">Model (A - Z)</option>
                                            <option value="price-asc">Model (Z - A)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {error && <Message variant='error'>{error}</Message> }
                            {products.length === 0 && <Message variant='warning'>No results were found for this query</Message>}
                            <Row>
                                {/*<ListView products={products} />*/}
                                {view? view: <ListView products={products} />}
                            </Row>
                            {loading ? '' :
                                <Paginator num_pages={num_pages} current={page}/>
                            }
                        </Col>
                    </Row>
                </Container>
            </div>

            <Footer />
        </>
    )
}

export default SearchProductsList