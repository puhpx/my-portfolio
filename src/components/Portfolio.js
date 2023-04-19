import React, { useState } from 'react';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
import '../App.css';
import '../PortfolioPage.css';

const images = {};
function importAll(r) {
  r.keys().forEach((key) => (images[key] = r(key)));
}
importAll(require.context('../assets/', true, /\.(png|jpe?g|svg)$/));

const projects = [
  {
    title: 'Eco Shop',
    description: 'A web app helps users shop more sustainably by providing info about the environmental impact of the products.',
    image: images['./site-under-construction.png'],
    repoLink: 'https://github.com/Sustainable-Shopping-Assistant',
  },
  {
    title: 'Gamer City',
    description: 'One-stop-shop for all things gaming, providing users with all the information and resources they need to enjoy their favorite games with instant messaging feature.',
    image: images['./GamerCity.png'],
    repoLink: 'https://github.com/rpp2205-boc-slate',
    engineeringJournalLink: 'https://gist.github.com/puhpx/0e3c97045a3ee7fa20595d8d49e35cb1',
  },
  {
    title: 'Atelier - Frontend',
    description: 'A fully functional e-commerce app that meets the specifications and requirements outlined by project stakeholders.',
    image: images['./Atelier-frontend.png'],
    demoLink: 'https://drive.google.com/file/d/1PUSsBg-L_d44s53TUUCdjrQ3O98OR-lM/view?usp=sharing',
    repoLink: 'https://github.com/Atelier-Frontend/project-atelier',
  },
  {
    title: 'Atelier - Backend',
    description: 'Replaced legacy API with a new backend system to support the full data set and meet production traffic demands.',
    image: images['./Atelier-backend.png'],
    repoLink: 'https://github.com/Atelier-Frontend/project-atelier',
    engineeringJournalLink: 'https://gist.github.com/puhpx/9464109678ea118c368d235b9cf1f577',
  },
];

const PortfolioPage = () => {
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState('');

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setShow(true);
  };

  const handleDemoButtonClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setShowVideoModal(true);
  };

  return (
    <div className="page-container">
      <Container fluid className="h-100">
        <Row className="mb-4"></Row>
        <Row className="flex-grow-1 d-flex">
          <Col></Col>
          <Col
            xs={12}
            md={10}
            className="d-flex align-items-center justify-content-center"
          >
            <Container
              className="p-4 rounded shadow-sm page-inner-container"
              style={{ minHeight: '75%', maxHeight: 'calc(100% - 2rem)'}}
            >
              <h2>My Portfolio</h2>
              <Row>
                {projects.map((project, index) => (
                  <Col
                    md={6}
                    lg={4}
                    key={index}
                    className={`py-2${index === projects.length - 1 ? ' mb-4' : ''}`} // Add the bottom margin to the last card
                  >
                    <Card className="h-100 portfolio-card">
                      <Card.Img
                        variant="top"
                        src={project.image}
                        alt={project.title}
                        style={{ height: '250px', cursor: 'pointer' }}
                        onClick={() => handleImageClick(project.image)}
                      />
                      <Card.Body className="d-flex flex-column">
                        <Card.Title>{project.title}</Card.Title>
                        <Card.Text>{project.description}</Card.Text>
                        <div className="mt-auto">
                          <br />
                          <a
                            href={project.repoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Code
                          </a>
                          <br />
                          {(!project.engineeringJournalLink && !project.demoLink) && (
                            <br />
                          )}
                          {project.demoLink && (
                            <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleDemoButtonClick(project.demoLink)}
                            >
                              Watch Demo
                            </a>
                          )}
                          {project.engineeringJournalLink && (
                            <a
                              href={project.engineeringJournalLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Engineering Journal
                            </a>
                          )}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Body>
                  <img
                    src={selectedImage}
                    alt="Selected Project"
                    style={{ width: '100%' }}
                  />
                </Modal.Body>
              </Modal>
              <Modal show={showVideoModal} onHide={() => setShowVideoModal(false)} centered>
                <Modal.Body>
                  <iframe
                    title="Demo Video"
                    src={selectedVideo}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ width: '100%', height: '100%' }}
                  ></iframe>
                </Modal.Body>
              </Modal>
            </Container>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default PortfolioPage;