import {Container, Col, Row} from "react-bootstrap";
import {Link} from 'react-router-dom'
import Breadcrumb from "./Breadcrumb";

function Page404() {
    return (
        <div className="error404-area pt-30 pb-60">
            <Breadcrumb slug='Error 404' />
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className="error-wrapper text-center ptb-50 pt-xs-20">
                            <div className="error-text">
                                <h1>404</h1>
                                <h2>Opps! PAGE NOT BE FOUND</h2>
                                <p>Sorry but the page you are looking for does not exist, have been removed, <br /> name
                                    changed or is temporarity unavailable.</p>
                            </div>
                            <div className="search-error">
                                <form id="search-form">
                                    <input type="text" placeholder="Search" />
                                        <button><i className="zmdi zmdi-search"></i></button>
                                </form>
                            </div>
                            <div className="error-button">
                                <Link className='' to='/'>Back to home page</Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Page404