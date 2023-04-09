import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import profileImage from '../assets/portfolio-site-profile.png';

const AboutMePage = () => {
  return (
    <Container>
      <Row className="align-items-center">
        <Col md={4}>
          <Image
            src={profileImage}
            alt="Chuck Song"
            fluid
          />
        </Col>
        <Col md={8}>
          <h2>About Me</h2>
          <p>
            Hi, I'm Chuck Song, I am passionate about creating
            high-quality software that is scalable, maintainable,
            and user-friendly.
            I have a strong foundation in Javascript, Typescript,
            HTML 5, SASS, React, Bootstrap, WebSocket, Node.js,
            PostgreSQL, MySQL, MongoDB, Docker, Nginx and AWS,
            and I am constantly learning and experimenting with
            new tools to stay up-to-date with the latest industry
            trends.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutMePage;
