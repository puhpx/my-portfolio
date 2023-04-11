import React, { useState } from 'react';
import { Container, Button, Image, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import profileImage from '../assets/portfolio-site-profile.png';
import { Fireworks } from '@fireworks-js/react';
import Confetti from 'react-dom-confetti';
import MyCanvas from '../three/MyCanvas';
import { Link } from 'react-router-dom';
import '../responsive.css';

const HomePage = () => {
  const [showFireworks, setShowFireworks] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showGift, setShowGift] = useState(false);

  const handleFireworksClick = () => {
    setShowFireworks(true);
    setTimeout(() => setShowFireworks(false), 4000);
  };

  const handleConfettiClick = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const confetti_config = {
    angle: 120,
    spread: 360,
    startVelocity: 30,
    elementCount: 500,
    dragFriction: 0.1,
    duration: 3000,
    stagger: 3,
    width: '10px',
    height: '10px',
    perspective: '500px',
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
  };

  const handleGiftClick = () => {
    setShowGift(true);
  };

  const handleCloseGiftClick = () => {
    setShowGift(false);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '57vh',
        left: '50vw',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
        width: '90%',
        height: '80%',
        overflow: (showFireworks || showConfetti) ? 'hidden' : 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {showFireworks && (
        <Fireworks
          options={{
            rocketsPoint: {
              min: 0,
              max: 100,
            },
          }}
          style={{
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            position: 'fixed',
            // background: '#000',
          }}
        />
      )}
      <Confetti active={showConfetti} config={confetti_config} />
      {showGift && (
        <div
          style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          width: '300px',
          height: '300px',
          overflow: 'auto',
          }}
        >
          <MyCanvas />
          <Button
            onClick={handleCloseGiftClick}
            variant="outline-danger"
            size="sm"
            style={{
              position: 'absolute',
              top: '5px',
              right: '10px',
              zIndex: 100000,
            }}
          >
            X
          </Button>
        </div>
      )}

      <Container
        style={(showFireworks || showConfetti || showGift) ?
              {opacity: 0.3,
               zIndex: -1} : {}}
      >
        <Row className="align-items-center">
          <Col xs={12} md={4} className="mb-4 mb-md-0">
            <Image
              src={profileImage}
              alt="Chuck Song"
              draggable="false"
              fluid
            />
          </Col>
          <Col xs={12} md={8} className="text-center text-md-left">
            <h1>Welcome to My Portfolio</h1>
            <p>I'm a Software Developer specializing in Full Stack Web Development</p>
            <Button
              as={Link}
              to="/portfolio"
              variant="secondary"
            >
              View My Portfolio
            </Button>
            <div className="mt-4">
              <a href="https://github.com/puhpx" target="_blank" rel="noopener noreferrer">
                <FaGithub size="2em" className="mx-2" color="#24292e"/>
              </a>
              <a
                href="https://linkedin.com/in/chuck-developer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size="2em" className="mx-2" color="#24292e"/>
              </a>
            </div>
          </Col>
        </Row>
      </Container>

      <Navbar
        expand="md"
        // bg="light"
        className="justify-content-end py-2 mt-auto"
        style={{
          zIndex: 1000,
        }}
      >
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="border-0 mx-2"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <div className="nav-buttons-container">
              <Nav.Link
                onClick={handleFireworksClick}
                className="text-secondary nav-link-button"
              >
                Fireworks!
              </Nav.Link>
              <Nav.Link
                onClick={handleConfettiClick}
                className="text-secondary nav-link-button"
              >
                Confetti!
              </Nav.Link>
              <Nav.Link onClick={handleGiftClick} className="text-secondary nav-link-button">
                Gift!
              </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default HomePage;
