import React, { useState, useEffect } from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import profileImage from '../assets/portfolio-site-profile.png';
import { Link } from 'react-router-dom';
import '../HomePage.css';
import {
  handleFireworksClick,
  handleConfettiClick,
  handleGiftClick,
  handleCloseGiftClick,
  confetti_config,
  FireworksComponent,
  ConfettiComponent,
  GiftComponent,
} from '../Effects';

const HomePage = () => {
  const [showFireworks, setShowFireworks] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setSidebarVisible(true);
      } else {
        setSidebarVisible(false);
      }
    };

    handleResize(); // Call the function once during the initial render

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className="home-page-container">
      <Container fluid className="vh-100 d-flex flex-column">
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
              style={{ minHeight: '75%', maxHeight: 'calc(100% - 2rem)' }}
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
                  <p>
                    I'm a Software Developer specializing in Full Stack Web
                    Development
                  </p>
                  <Link to="/portfolio" className="btn btn-secondary">
                    View My Portfolio
                  </Link>
                  <div className="mt-4">
                    <a
                      href="https://github.com/puhpx"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub
                        size="2em"
                        className="mx-2"
                        color="#24292e"
                      />
                    </a>
                    <a
                      href="https://linkedin.com/in/chuck-developer"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin
                        size="2em"
                        className="mx-2"
                        color="#24292e"
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <div id="forum_side_menu" className="shadow-md">
                <div id="forum-menu-container" className="group flex">
                  <div
                    id="forum-menu-button"
                    className="px-px py-0 rounded-r xl:px-0 w-8px xl:w-32px xl:py-2 group-hover:rounded-none"
                    onClick={() => setSidebarVisible(!sidebarVisible)}
                  >
                    <div className="xl:hidden my-8 text-white">
                      {sidebarVisible ? '<' : '>'}
                    </div>
                    <div className="hidden xl:block mt-1 mb-2 px-1 text-base text-white text-center font-semibold leading-snug">
                      Effects
                    </div>
                  </div>
                  <div
                    className={`sidebar-buttons-container ${
                      sidebarVisible || window.innerWidth >= 992 ? 'sidebar-visible' : ''
                    }`}
                  >
                    <div
                      className="sidebar-item"
                      onClick={() => handleFireworksClick(setShowFireworks)}
                    >
                      Fireworks!
                    </div>
                    <div
                      className="sidebar-item"
                      onClick={() => handleConfettiClick(setShowConfetti)}
                    >
                      Confetti!
                    </div>
                    <div
                      className="sidebar-item"
                      onClick={() => handleGiftClick(setShowGift)}
                    >
                      Gift!
                    </div>
                  </div>
                </div>
              </div>
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
    </div>
  );
};

export default HomePage;
