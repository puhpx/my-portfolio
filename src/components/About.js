import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import profileImage from '../assets/portfolio-site-profile.png';
import '../AboutMePage.css';

const AboutMePage = () => {
  return (
    <div className="about-me-container">
      <Container fluid className="h-100">
        <Row className="h-100">
          <Col className="d-flex justify-content-center align-items-center">
            <div className="about-me-inner-container"
                 style={{ minHeight: '75%', maxHeight: 'calc(100% - 2rem)'}}
            >
              <Row className="align-items-center">
                <Col md={4}>
                  <Image
                    src={profileImage}
                    alt="Chuck Song"
                    draggable="false"
                    fluid
                  />
                </Col>
                <Col md={8}>
                  <h2>About Me</h2>
                  <br></br>
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
                    <br></br>
                    <br></br>
                    Over the years, I have worked on a variety of full stack
                    project ranging from e-commerce platform to social network
                    site for gamers, and have a proven track record of delivering
                    high-quality products on time and within budget.
                    <br></br>
                    <br></br>
                    In addition to my technical skills, I am a collaborative team
                    player who enjoys working with cross-functional teams to bring
                    new ideas to life. I am skilled in problem-solving and have
                    experience in mentoring junior team members and leading projects.
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutMePage;
