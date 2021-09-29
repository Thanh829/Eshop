import React, { useEffect } from 'react'
import { Button, Card, Image, ListGroup } from 'react-bootstrap'
import { Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, removeItem } from '../actions/CartActions'
import Message from '../components/Message'

const CartScreen = ({ match, location, history }) => {

    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const cartState = useSelector(state => state.cart)
    const { cartItems } = cartState

    const dispatch = useDispatch()

    useEffect(() => {
        if (productId) {
            console.log(qty)
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeItem(id))
    }
    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h2 className='h2'> Shopping Cart</h2>
                {cartItems.length === 0 ? <Message> Your cart is empty <Link to='/'>Go back</Link></Message> :

                    <ListGroup variant='flush'>

                        {cartItems.map(x => (
                            <ListGroup.Item key={x.product}>

                                <Row>
                                    <Col md={2}>
                                        <Image src={x.image} alt={x.name} fluid rounded></Image>
                                    </Col>
                                    {/* <Col md={3}><Link to={`/product/${x.product}`}>{x.name}</Link></Col> */}
                                    <Col md={2}>{x.price}</Col>
                                    <Col md={2}>
                                        <Form.Control as='select' value={x.qty} onChange={(e) =>
                                            dispatch(addToCart(x.product, e.target.value))} >

                                            {[...Array(x.countInStock).keys()].map(
                                                x => (
                                                    <option key={x + 1} value={x + 1} >{x + 1}</option>
                                                )
                                            )}
                                        </Form.Control>

                                    </Col>
                                    <Col md={2}>
                                        <Button variant='light' type='button' onClick={() => removeFromCartHandler(x.product)}><i className='fas fa-trash'></i></Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                }
            </Col>
            <Col md={4}>

                <Card>
                    <ListGroup variant='flush'>

                        <ListGroup.Item>
                            <h2 className='h3'>Subtotal ({cartItems.reduce((acc, x) =>
                                Number(acc) + Number(x.qty)
                                , 0)}) items
                            </h2>
                            ${cartItems.reduce((acc, x) =>
                                acc + x.price * x.qty
                                , 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='btn-block' onClick={checkoutHandler}>Proceed to checkout</Button>

                        </ListGroup.Item>
                    </ListGroup>

                </Card>

            </Col>
        </Row>
    )
}

export default CartScreen
