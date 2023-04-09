import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const projects = [
  // My projects here
  {
    title: 'Project 1',
    description: 'A brief description of Project 1',
    image: 'project-1-image-url',
    demoLink: 'project-1-demo-url',
    repoLink: 'project-1-repo-url',
  },
  {
    title: 'Project 2',
    description: 'A brief description of Project 2',
    image: 'project-2-image-url',
    demoLink: 'project-2-demo-url',
    repoLink: 'project-2-repo-url',
  },
  {
    title: 'Project 3',
    description: 'A brief description of Project 3',
    image: 'project-3-image-url',
    demoLink: 'project-3-demo-url',
    repoLink: 'project-3-repo-url',
  },

];

const PortfolioPage = () => {
  return (
    <Container>
      <h2>My Portfolio</h2>
      <Row>
        {projects.map((project, index) => (
          <Col md={4} key={index}>
            <Card className="mb-4">
              <Card.Img variant="top" src={project.image} />
              <Card.Body>
                <Card.Title>{project.title}</Card.Title>
                <Card.Text>{project.description}</Card.Text>
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer">View Demo</a>
                <br />
                <a href={project.repoLink} target="_blank" rel="noopener noreferrer">View Code</a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PortfolioPage;
