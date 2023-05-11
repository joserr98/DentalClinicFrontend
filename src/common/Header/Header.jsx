import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const Header = () => {
  
    const navigate = useNavigate()
    return (
    <div className='headerDesign'>

      <Navbar className="headerDesign" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={() => navigate('/')}>Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/login')}>Login</Nav.Link>
            <Nav.Link onClick={() => navigate('/register')}>Register</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}
