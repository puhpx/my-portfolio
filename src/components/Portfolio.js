import React, { useState } from 'react';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';

const images = {};
function importAll(r) {
  r.keys().forEach((key) => (images[key] = r(key)));
}
importAll(require.context('../assets/', true, /\.(png|jpe?g|svg)$/));

const projects = [
  {
    title: 'Eco Shop',
    description: 'A web app helps users shop more sustainably by providing info about the environmental impact of the products.',
    image: images['./logo.png'],
    demoLink: 'project-1-demo-url',
    repoLink: 'https://github.com/Sustainable-Shopping-Assistant',
  },
  {
    title: 'Gamer City',
    description: 'One-stop-shop for all things gaming, providing users with all the information and resources they need to enjoy their favorite games with instant messaging feature.',
    image: images['./GamerCity.png'],
    demoLink: 'project-2-demo-url',
    repoLink: 'https://github.com/rpp2205-boc-slate',
  },
  {
    title: 'Atelier - Frontend',
    description: 'A fully functional e-commerce app that meets the specifications and requirements outlined by project stakeholders.',
    image: images['./Atelier-frontend.png'],
    demoLink: 'project-3-demo-url',
    repoLink: 'https://github.com/Atelier-Frontend/project-atelier',
  },
  {
    title: 'Atelier - Backend',
    description: 'Replaced legacy API with a new backend system to support the full data set and meet production traffic demands.',
    image: images['./Atelier-backend.png'],
    demoLink: 'project-4-demo-url',
    repoLink: 'https://github.com/Atelier-Frontend/project-atelier',
  },
];

const PortfolioPage = () => {
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setShow(true);
  };

  return (
    <Container>
      <h2>My Portfolio</h2>
      <Row>
        {projects.map((project, index) => (
          <Col md={4} key={index}>
            <Card className="mb-4 h-100">
              <Card.Img
                variant="top"
                src={project.image}
                alt={project.title}
                style={{ maxHeight: '300px', cursor: 'pointer' }}
                onClick={() => handleImageClick(project.image)}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{project.title}</Card.Title>
                <Card.Text>{project.description}</Card.Text>
                <div className="mt-auto">
                  <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                    View Demo
                  </a>
                  <br />
                  <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                    View Code
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Body>
          <img src={selectedImage} alt="Selected Project" style={{ width: '100%' }} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PortfolioPage;
