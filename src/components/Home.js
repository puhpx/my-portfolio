import React, { useState } from 'react';
import { Container, Button, Image, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import profileImage from '../assets/portfolio-site-profile.png';
import { Link } from 'react-router-dom';
import '../responsive.css';
import '../PortfolioPage.css';
import { handleFireworksClick, handleConfettiClick, handleGiftClick, handleCloseGiftClick, confetti_config, FireworksComponent, ConfettiComponent, GiftComponent } from '../Effects';

const HomePage = () => {
  const [showFireworks, setShowFireworks] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showGift, setShowGift] = useState(false);

  //Prevent scrollbar extending when the confetti is active, need import useEffect
  // useEffect(() => {
  //   if (showConfetti) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'auto';
  //   }
  // }, [showConfetti]);


  return (
    <Container fluid className="vh-100 d-flex flex-column portfolio-container">
      <Row className="mb-4"></Row>
      <Row className="flex-grow-1 d-flex">
        <Col></Col>
        <Col
          xs={12}
          md={10}
          className="d-flex align-items-center justify-content-center"
        >
          <Container
            className="p-4 rounded shadow-sm portfolio-inner-container"
            style={{ minHeight: '75%', maxHeight: 'calc(100% - 2rem)'}}
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

            <Navbar
              expand="md"
              className="justify-content-end py-2 mt-auto"
            >
              <Navbar.Toggle
                aria-controls="responsive-navbar-nav"
                className="border-0 mx-2"
              />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav>
                  <div className="nav-buttons-container">
                    <Nav.Link
                      onClick={() => handleFireworksClick(setShowFireworks)}
                      className="text-secondary nav-link-button"
                    >
                      Fireworks!
                    </Nav.Link>
                    <Nav.Link
                      onClick={() => handleConfettiClick(setShowConfetti)}
                      className="text-secondary nav-link-button"
                    >
                      Confetti!
                    </Nav.Link>
                    <Nav.Link onClick={() => handleGiftClick(setShowGift)} className="text-secondary nav-link-button">
                      Gift!
                    </Nav.Link>
                  </div>
                </Nav>
              </Navbar.Collapse>
            </Navbar>

            {showFireworks && <FireworksComponent />}
            {<ConfettiComponent confetti_config={confetti_config} active={showConfetti} />}
            {showGift && (
              <GiftComponent
                handleCloseGiftClick={() => handleCloseGiftClick(setShowGift)}
              />
            )}
          </Container>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default HomePage;
