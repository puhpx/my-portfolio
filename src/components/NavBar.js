import React from 'react';
import { Navbar, Nav, Container, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css'

const NavBar = ({ changeTheme }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/about">About Me</Nav.Link>
            <Nav.Link as={Link} to="/portfolio">Portfolio</Nav.Link>
          </Nav>
          <DropdownButton id="dropdown-basic-button" title="Change Theme" variant="secondary">
            <Dropdown.Item onClick={() => changeTheme('theme1')}>Theme 1</Dropdown.Item>
            <Dropdown.Item onClick={() => changeTheme('theme2')}>Theme 2</Dropdown.Item>
            <Dropdown.Item onClick={() => changeTheme('theme3')}>Theme 3</Dropdown.Item>
          </DropdownButton>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
