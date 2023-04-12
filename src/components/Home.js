import React, { useState, useEffect } from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import profileImage from '../assets/portfolio-site-profile.png';
import { Link } from 'react-router-dom';
import '../HomePage.css';
import confettiIcon from '../assets/confetti-icon.png';
import fireworksIcon from '../assets/fireworks-icon.png';
import giftIcon from '../assets/gift-icon.png';
import leftIcon from '../assets/left-arrow-icon.png';
import rightIcon from '../assets/right-arrow-icon.png';
import { TypeAnimation } from 'react-type-animation';
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

  const typeWriterText = [
    'Full Stack Developer',
    'React Enthusiast',
    'Open Source Contributor',
  ];

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
                <h1><span role="img" aria-label="Waving Hand">
                    👋
                  </span>
                    Hi there! I'm Chuck{' '}</h1>

                <TypeAnimation
                  className="typist-text"
                  sequence={typeWriterText}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                />

                  <div className="mt-4 d-flex flex-column">
                    <span style={{marginTop: '1rem', marginBottom: '1rem' }}>
                      <Link to="/portfolio" className="btn btn-secondary">
                        View My Portfolio
                      </Link>
                    </span>
                    <span>
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
                    </span>
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
                    <div className="hidden xl:block mt-1 mb-2 px-1 text-base text-white text-center font-semibold leading-snug">
                      {sidebarVisible ? <img src={rightIcon} alt=">" className="arrow-icon" />
                                      : <img src={leftIcon} alt="<" className="arrow-icon" />
                      }
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
                      <img src={fireworksIcon} alt="Fireworks" className="sidebar-icon" />
                    </div>
                    <div
                      className="sidebar-item"
                      onClick={() => handleConfettiClick(setShowConfetti)}
                    >
                      <img src={confettiIcon} alt="Confetti" className="sidebar-icon" />
                    </div>
                    <div
                      className="sidebar-item"
                      onClick={() => handleGiftClick(setShowGift)}
                    >
                      <img src={giftIcon} alt="Gift" className="sidebar-icon" />
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
