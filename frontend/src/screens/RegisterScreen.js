import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../actions/UserAction'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'

const RegisterScreen = ({ history, location }) => {

    const [name, setName] = useState('')
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const redirect = location.search ? location.search.split('=')[1] : ''

    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            console.log(userInfo)
            history.push(redirect)
        }
    }, [userInfo, history, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, username, password))
        }

    }

    return (
        <FormContainer>
            <h2>Sign Up</h2>
            {error && <Message variant='danger'> {error}</Message>}
            {message && <Message variant='danger'> {message}</Message>}
            {loading && <Loader></Loader>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control placeholder={'Name'} value={name} onChange={e => setName(e.target.value)}></Form.Control>

                </Form.Group>
                <Form.Group controlId='username'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder={'Enter email'} value={username} onChange={e => setUserName(e.target.value)}></Form.Control>

                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder={'Enter password'} value={password} onChange={e => setPassword(e.target.value)}></Form.Control>

                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder={'Enter password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}></Form.Control>

                </Form.Group>
                <Button type='submit' variant='primary'>
                    Register
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

export default RegisterScreen
