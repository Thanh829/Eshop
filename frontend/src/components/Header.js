import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/UserAction'

const Header = () => {

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => { dispatch(logout()) }

    return (
        <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Eshop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <LinkContainer to='/cart'>
                                <Nav.Link ><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                            </LinkContainer>
                            {userInfo ? <NavDropdown title={userInfo.name} id='username'>

                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>

                                        Profile
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown> : <LinkContainer to='/login'>
                                <Nav.Link>
                                    <i className="fas fa-user"></i> User
                                </Nav.Link>
                            </LinkContainer>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
