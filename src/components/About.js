import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import profileImage from '../assets/portfolio-site-profile.png';
import githubContributions from '../assets/github-contributions.png';
import '../App.css';
import '../AboutMePage.css';
import { FaNodeJs } from 'react-icons/fa';
import { DiReact } from 'react-icons/di';
import { AiOutlineCode, AiOutlineApi } from 'react-icons/ai';
import { BiTask } from 'react-icons/bi';
import { RiTestTubeLine } from 'react-icons/ri';
import { BsGraphUp } from 'react-icons/bs';
import {
  SiJavascript,
  SiReact,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiNginx,
  SiAmazonaws,
  SiHtml5,
  SiCss3,
  SiSass,
  SiRedux,
  SiBootstrap,
  SiTypescript,
  SiExpress,
  SiGraphql,
  SiMariadb,
  SiJest,
  SiMocha,
  SiChai,
  SiVim,
  SiGit,
  SiNpm,
  SiWebpack,
  SiBabel,
  SiVite,
} from 'react-icons/si';

const AboutMePage = () => {
  const techSkills = [
    {
      category: 'Front-End',
      skills: [
        { icon: SiJavascript, name: 'JavaScript' },
        { icon: SiTypescript, name: 'TypeScript' },
        { icon: SiReact, name: 'React' },
        { icon: SiRedux, name: 'Redux' },
        { icon: SiHtml5, name: 'HTML5' },
        { icon: SiCss3, name: 'CSS3' },
        { icon: SiSass, name: 'Sass' },
        { icon: AiOutlineCode, name: 'Three.js' },
        { icon: SiBootstrap, name: 'Bootstrap' },
      ],
    },
    {
      category: 'Back-End',
      skills: [
        { icon: FaNodeJs, name: 'Node.js' },
        { icon: DiReact, name: 'Next.js' },
        { icon: SiExpress, name: 'Express' },
        { icon: SiPostgresql, name: 'PostgreSQL' },
        { icon: SiMysql, name: 'MySQL' },
        { icon: SiMongodb, name: 'MongoDB' },
        { icon: SiGraphql, name: 'GraphQL' },
        { icon: SiMariadb, name: 'MariaDB' },
        { icon: AiOutlineApi, name: 'RESTful API' },
      ],
    },
    {
      category: 'Testing/Deployment',
      skills: [
        { icon: SiJest, name: 'Jest' },
        { icon: SiMocha, name: 'Mocha' },
        { icon: SiChai, name: 'Chai' },
        { icon: SiAmazonaws, name: 'AWS' },
      ],
    },
    {
      category: 'Developer Tools',
      skills: [
        { icon: SiVim, name: 'Vim' },
        { icon: SiGit, name: 'Git' },
        { icon: SiNpm, name: 'npm' },
        { icon: SiNginx, name: 'Nginx' },
        { icon: SiWebpack, name: 'Webpack' },
        { icon: SiBabel, name: 'Babel' },
        { icon: SiVite, name: 'Vite' },
        { icon: BsGraphUp, name: 'Agile' },
        { icon: BiTask, name: 'Scrum' },
        { icon: RiTestTubeLine, name: 'TDD' },
      ],
    },
  ];

  const [smallScreen, setSmallScreen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setSmallScreen(false);
      } else {
        setSmallScreen(true);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="page-container">
      <Container fluid className="h-100">
        <Row className="h-100">
          <Col className="d-flex justify-content-center align-items-center">
              <Container
                className="p-4 rounded shadow-sm page-inner-container"
                style={{ minHeight: '75%', maxHeight: 'calc(100% - 2rem)'}}
              >
              <Row>
                <Col>
                  <h2 className="text-center">About Me</h2>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Image
                    src={profileImage}
                    alt="Chuck Song"
                    draggable="false"
                    fluid
                    rounded
                    className="profile-image"
                  />
                </Col>
                <Col md={8}>
                <p>
                <br/>Hi there, I'm Chuck Song! 👋<br/><br/>

                  I'm a passionate software engineer with a love for building scalable, maintainable, and user-friendly applications. With a strong foundation in web technologies, I have experience working on diverse projects ranging from e-commerce platforms to social networks for gamers.<br/><br/>

                  🚀 I'm always looking for new challenges and opportunities to learn and grow in my field.<br/><br/>

                  👨‍💻 I enjoy collaborating with teams and leading projects, and I'm always happy to share my knowledge and mentor others.<br/><br/>

                  🌟 Let's work together and build something amazing!
                </p>
                </Col>
              </Row>
              <h3>Tech Skills</h3>
                {techSkills.map((category, index) => (
                  <div key={index} className="tech-skills-category">
                    <h4>{category.category}</h4>
                    <div className="tech-skills">
                      {category.skills.map((skill, index) => (
                        <div className="tech-skill" key={index}>
                          <skill.icon className="tech-skill-icon" />
                          {smallScreen ? '' : <span>{skill.name}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              <h3>GitHub Contributions</h3>
              <Image
                src={githubContributions}
                alt="GitHub Contributions"
                draggable="false"
                className="github-contributions"
                fluid
              />
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutMePage;
