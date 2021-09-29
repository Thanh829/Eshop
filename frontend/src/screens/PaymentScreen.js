import React, { useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/CartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'

const PaymentScreen = ({ history }) => {

    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    const cart = useSelector(state => state.cart)

    const { shippingAddress } = cart

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const disPatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        disPatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')

    }

    return (
        <FormContainer onSubmit>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <h2>Payment Method</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check type='radio' label=' Paypal or Credit Card' id='Paypal' name='paymentMethod' value='Paypal' checked onChange={(e) => setPaymentMethod(e.target.value)}>
                        </Form.Check>
                        {/* <Form.Check type='radio' label=' Stripe' id='Paypal' name='paymentMethod' value='Stripe' onChange={(e) => setPaymentMethod(e.target.value)}>
                        </Form.Check> */}
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
