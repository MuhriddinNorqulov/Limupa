import {Container, Row, Col, Form} from 'react-bootstrap'
import React, {useEffect, useState} from "react";
import {Rating} from "react-simple-star-rating";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {createProductReview} from "../../actions/productActions";
import {PRODUCT_CREATE_REVIEW_RESET} from "../../constants/productConstants";
import Message from "../components/Message";

function Reviews() {
    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const params = useParams()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails



    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {loading: loadingReview, error: errorReview, success: successReview} = productReviewCreate


    useEffect(() => {
        if (successReview) {
            setComment('')
            setRating(0)
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }

    }, [successReview])

    const handleRating = (rate) => {
        setRating((rate / 20))

    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            params.id,
            {rating, comment}
        ))

    }

    return (

            <Row className='mt-5'>
                <Col lg={7} md={8}>
                    <div className="li-comment-section">
                        <ul>
                            {product.reviews.map(item => {

                                return(
                                <li key={item._id}>
                                    {/*<div className="author-avatar pt-15">*/}
                                    {/*    /!*<img src="images/product-details/user.png" alt="User" />*!/*/}
                                    {/*</div>*/}
                                    <div className="comment-body pl-15">
                                        <span className="reply-btn pt-15 pt-xs-5"><a href="#">reply</a></span>
                                        <h5 className="comment-author pt-15">{item.name}</h5>
                                        <div className="comment-post-date">
                                            {item.createdAt.toString()}
                                        </div>
                                        <p>{item.comment}</p>
                                    </div>
                                </li>
                                )
                            })}




                        </ul>
                    </div>
                </Col>
                <Col lg={5} md={8}>
                    {errorReview && <Message variant='error'>{errorReview}</Message>}
                    <div className="li-blog-comment-wrapper">
                        <Form onSubmit={submitHandler}>
                            <div className="comment-post-box">
                                <div className="row">
                                    <div className='col-lg-12'>
                                        <label>Rating: </label>
                                        <Rating style={{position:'relative', top:'3px'}} fillColor={'#fed700'} size={'20px'} ratingValue={rating*20} onClick={handleRating} />
                                    </div>
                                    <div className="col-lg-12">
                                        <label>comment: </label>
                                        <textarea
                                            onChange={(e) => setComment(e.target.value)}
                                            name="comment"
                                            placeholder="Write a comment" />
                                    </div>


                                    <div className="col-lg-12">
                                        <button type='submit' className='my_button-md'>Submit</button>

                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
    )
}

export default Reviews