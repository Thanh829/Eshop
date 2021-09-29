import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../actions/UserAction'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'

const LoginScreen = ({ history, location }) => {

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const redirect = location.search ? location.search.split('=')[1] : ''

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [userInfo, history, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(username, password))
    }

    return (
        <FormContainer>
            <h2>Sign In</h2>
            {error && <Message variant='danger'> {error}</Message>}
            {loading && <Loader></Loader>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='username'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder={'Enter email'} value={username} onChange={e => setUserName(e.target.value)}></Form.Control>

                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder={'Enter password'} value={password} onChange={e => setPassword(e.target.value)}></Form.Control>

                </Form.Group>
                <Button type='submit' variant='primary'>
                    Sign In
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>

            </Row>
        </FormContainer>
    )
}

export default LoginScreen
