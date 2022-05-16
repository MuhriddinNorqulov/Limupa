import {Row, Col, Container, Form} from "react-bootstrap";
import Breadcrumb from "../components/Breadcrumb";

import MyOrders from "./MyOrders";
import UserInfo from "./UserInfo";
import Header from "../components/Header";
import Footer from "../components/Footer";


function Profile () {

    return (
        <>
            <Header />
            <Breadcrumb slug='User Info' />
            <Container>

              <Row>
                  <Col lg={3} md={4} sm={12}>
                      <UserInfo />
                  </Col>

                  <Col lg={9} md={8} sm={12}>
                      <MyOrders />
                  </Col>

              </Row>
            </Container>
            <Footer />
        </>

    )
}

export default Profile