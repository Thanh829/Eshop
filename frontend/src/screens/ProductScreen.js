import React, { useEffect, useState } from 'react'
import { Col, Row, Image, ListGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { productDetails } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Form } from 'react-bootstrap'

const ProductScreen = ({ history, match }) => {

    const [quantity, setQuantity] = useState(1)

    const dispatch = useDispatch()

    const productDetailsReducer = useSelector(state => state.productDetails)

    const { loading, error, product } = productDetailsReducer


    useEffect(() => {
        dispatch(productDetails(match.params.id))
    }, [dispatch, match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${quantity}`)
    }

    return (
        <div>
            <Link className='btn btn-dark my-3' to='/'> Go Back</Link>
            {loading ? <Loader></Loader> : error ? <Message variant='danger'>{error}</Message> :
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name}></Image>
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: {product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <ListGroup >
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price: </Col>
                                    <Col>
                                        <strong>{product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status: </Col>
                                    <Col>
                                        <strong>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {product.countInStock > 0 && (<ListGroup.Item>
                                <Row>
                                    <Col>Quantity: </Col>
                                    <Col>
                                        <Form.Control as='select' value={quantity} onChange={(e) =>
                                            setQuantity(e.target.value)} >

                                            {[...Array(product.countInStock).keys()].map(
                                                x => (
                                                    <option key={x + 1} value={x + 1} >{x + 1}</option>
                                                )
                                            )}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>)
                            }


                            <ListGroup.Item>
                                <Row className='m-1'>
                                    <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock <= 0 ? true : false}>
                                        Add to cart
                                    </Button>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            }
        </div>
    )
}

export default ProductScreen
