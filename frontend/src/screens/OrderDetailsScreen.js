import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PayPalButton } from 'react-paypal-button-v2'
import { getOrderDetails, orderPay } from '../actions/orderAction'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { ORDER_PAY_RESET } from '../constants/OrderConstant'

const OrderDetailsScreen = ({ match }) => {

    const [sdkReady, setSdkReady] = useState(false)
    const dispatch = useDispatch()
    const orderId = match.params.orderId
    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPayReducer = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPayReducer

    const getPaypalScript = async () => {
        const { data } = await axios.get('/api/paypal/config')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    const successHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(orderPay(orderId, paymentResult))
    }

    useEffect(() => {
        if (!order || successPay) {
            if (successPay) {
                dispatch({ type: ORDER_PAY_RESET })
            }
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                getPaypalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [])

    // return <></>
    return loading ? <Loader></Loader> : error ? <Message variant='danger'> {error}</Message> : <>

        <h2>Order {order._id}</h2>

        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>

                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>        <strong>Name: </strong> {order.user.name}
                        </p>
                        <p>        <a href={`mailto:${order.user.email}`}> {order.user.email}</a>
                        </p>
                        <p>
                            <strong>Address: </strong>
                            {order.shippingAddress.address},{order.shippingAddress.city},{order.shippingAddress.postalCode},{' '},{order.shippingAddress.country}

                        </p>
                        {order.isDelivered ? <Message variant='success'>Delivered at {order.deliveredAt}</Message> : <Message variant='danger'> Not delivered</Message>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}

                        </p>
                        {order.isPaid ? <Message variant='success'>Paid at {order.paidAt}</Message> : <Message variant='danger'> Not paid</Message>}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? <Message> Your order is empty</Message> : (
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} rounded fluid></Image>
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x {item.price} = {item.qty * item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>

                </ListGroup>

            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2> Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Items
                                </Col>
                                <Col>
                                    $ {order.itemsPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Shipping Price
                                </Col>
                                <Col>
                                    $ {order.shippingPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Tax
                                </Col>
                                <Col>
                                    $ {order.taxPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Total
                                </Col>
                                <Col>
                                    $ {order.totalPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader />}
                                {sdkReady ? (<Loader />) :
                                    (<PayPalButton amount={order.totalPrice} onSuccess={successHandler}></PayPalButton>)
                                }
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
}

export default OrderDetailsScreen
