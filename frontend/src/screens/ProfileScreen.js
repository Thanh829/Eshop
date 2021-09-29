import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/UserAction'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProfileScreen = ({ history, location }) => {

    const [name, setName] = useState('')
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const { loading } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdate = useSelector((state) => state.userUpdateProfile)
    const { success, error } = userUpdate

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!userInfo.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(userInfo.name)
                setUserName(userInfo.email)
            }
        }
    }, [dispatch, userInfo, history])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({ _id: userInfo._id, name, email: username, password }))
        }

    }

    return (
        <Row>
            <Col md={3}>
                <h2>Profile</h2>
                {error && <Message variant='danger'> {error}</Message>}
                {message && <Message variant='danger'> {message}</Message>}
                {success && <Message variant='success'> Profile Updated</Message>}
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
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Order</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen
