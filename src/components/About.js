import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import profileImage from '../assets/portfolio-site-profile.png';

const AboutMePage = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
        width: '90%',
        height: '80%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Container>
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
      </Container>
    </div>
  );
};

export default AboutMePage;
