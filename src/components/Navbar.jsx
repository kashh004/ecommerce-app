import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();

  const logoutHandler = () => {
    logout();
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect className="py-3">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="fw-bold fs-4">
              🛍️ E-Commerce Store
            </Navbar.Brand>
          </LinkContainer>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <LinkContainer to="/products">
                <Nav.Link className="fw-medium">Products</Nav.Link>
              </LinkContainer>
              
              <LinkContainer to="/cart">
                <Nav.Link className="fw-medium position-relative">
                  🛒 Cart
                  {getCartCount() > 0 && (
                    <Badge 
                      bg="danger" 
                      className="position-absolute top-0 start-100 translate-middle"
                      style={{ fontSize: '0.7rem' }}
                    >
                      {getCartCount()}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              
              {user ? (
                <NavDropdown 
                  title={
                    <span className="fw-medium">
                      👤 {user.name}
                    </span>
                  } 
                  id="username"
                  className="fw-medium"
                >
                  <LinkContainer to="/orders">
                    <NavDropdown.Item>
                      📋 My Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                  {user.isAdmin && (
                    <LinkContainer to="/admin">
                      <NavDropdown.Item>
                        ⚙️ Admin Dashboard
                      </NavDropdown.Item>
                    </LinkContainer>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler} className="text-danger">
                    🚪 Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="fw-medium">
                    🔐 Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header; 