import React, { useState } from 'react';
import { Container, Button, Image, Row, Col } from 'react-bootstrap';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import profileImage from '../assets/portfolio-site-profile.png';
import { Fireworks } from '@fireworks-js/react';
import Confetti from 'react-dom-confetti';

const HomePage = () => {
  const [showFireworks, setShowFireworks] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleFireworksClick = () => {
    setShowFireworks(true);
    setTimeout(() => setShowFireworks(false), 4000);
  };

  const handleConfettiClick = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
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

  return (
    <div style={{ position: 'fixed', height: '80vh', marginLeft: '10vw', marginTop: '10vh' }}>
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
            background: '#000',
          }}
        />
      )}
      <Button
        onClick={handleFireworksClick}
        variant="outline-secondary"
        style={{
          position: 'fixed',
          right: '120px',
          bottom: '20px',
          zIndex: 1000,
        }}
      >
        Fireworks!
      </Button>
      <Confetti active={showConfetti} config={confetti_config} />
      <Button
        onClick={handleConfettiClick}
        variant="outline-secondary"
        style={{
          position: 'fixed',
          right: '20px',
          bottom: '20px',
          zIndex: 1000,
        }}
      >
        Confetti!
      </Button>
      <Container>
        <Row className="align-items-center">
          <Col md={4}>
            <Image
              src={profileImage}
              alt="Chuck Song"
              fluid
              style={(showFireworks || showConfetti) ?
                {opacity: 0.3,
                zIndex: -1,} : {}}
            />
          </Col>
          <Col md={8} className="text-center text-md-left">
            <h1>Welcome to My Portfolio</h1>
            <p>I'm a Software Developer specializing in Web Development</p>
            <Button href="/portfolio" variant="accent">
              View My Portfolio
            </Button>
            <div className="mt-4">
              <a
                href="https://github.com/puhpx"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size="2em" className="mx-2" color="#24292e" />
              </a>
              <a
                href="https://linkedin.com/in/chuck-developer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size="2em" className="mx-2" color="#24292e" />
              </a>
            </div>
            </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
