import React from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon, FaStar, FaCog } from 'react-icons/fa';
import '../App.css';

const NavBar = ({ changeTheme }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
        <span className="d-lg-none nav-gear-button">
          <GearDropdown changeTheme={changeTheme} />
        </span>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/about">About Me</Nav.Link>
            <Nav.Link as={Link} to="/portfolio">Portfolio</Nav.Link>
          </Nav>
          <Nav className="ms-auto d-none d-lg-flex">
            <GearDropdown changeTheme={changeTheme} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const GearDropdown = ({ changeTheme }) => (
  <Dropdown align="end">
    <Dropdown.Toggle as={Nav.Link} id="dropdown-basic-button" variant="secondary">
      <FaCog className="gear-icon" />
    </Dropdown.Toggle>
    <Dropdown.Menu className="theme-dropdown-menu">
      <Dropdown.Item onClick={() => changeTheme('theme1')}>
        <FaSun />
      </Dropdown.Item>
      <Dropdown.Item onClick={() => changeTheme('theme2')}>
        <FaMoon />
      </Dropdown.Item>
      <Dropdown.Item onClick={() => changeTheme('theme3')}>
        <FaStar />
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export default NavBar;
