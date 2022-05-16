import {Col, Row} from "react-bootstrap";
import ProductGridItem from "../components/ProductGridItem";
import {Link} from 'react-router-dom'
import ProductLIstItem from "../components/ProductLIstItem";

export function ListView({products}) {
    return (
        <Col>
            {products.map(item => {
                return(
                    <ProductLIstItem key={item._id} product={item} />
                )
            })}

        </Col>
    )
}


export function GridView({products}) {
    return(
        products.map(item => {
            return(
                <Col key={item._id}  lg={4} md={4} sm={6}>
                    <ProductGridItem product={item}/>
                </Col>
            )
        })
    )
}