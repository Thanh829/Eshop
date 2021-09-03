import React from 'react'
import { Col, Row, Image, ListGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import products from '../products'

const ProductScreen = ({ match }) => {

    const product = products.find((p) => p._id === match.params.id)
    return (
        <div>
            <Link className='btn btn-dark my-3' to='/'> Go Back</Link>
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
                        <ListGroup.Item>
                            <Row className='m-1'>
                                <Button className='btn-block' type='button' disabled={product.countInStock <= 0 ? true : false}>
                                    Add to cart
                                </Button>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </div>
    )
}

export default ProductScreen
