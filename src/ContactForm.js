import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { AiOutlineSend } from 'react-icons/ai';
import emailjs from 'emailjs-com';

const ContactForm = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // Send email using emailjs
      emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form, 'YOUR_USER_ID')
        .then((result) => {
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });

      form.reset();
    }

    setValidated(true);
  };

  return (
    <div className="contact-form-container">
      <h2>Contact Me</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="firstName">
                <Form.Control
                  required
                  type="text"
                  pattern="[A-Za-z]+"
                  placeholder="First Name"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid first name.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="lastName">
                <Form.Control
                  required
                  type="text"
                  pattern="[A-Za-z]+"
                  placeholder="Last Name"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid last name.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="phoneNumber">
            <Form.Control
              required
              type="tel"
              pattern="[0-9]+"
              placeholder="Phone Number"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid phone number.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Control
              required
              type="email"
              placeholder="Email"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email address.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="message">
            <Form.Control
              required
              as="textarea"
              rows={3}
              placeholder="Hey Chuck, let's connect!"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a message.
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button variant="outline-primary" type="submit">
              <AiOutlineSend size="1.5em" />
            </Button>
          </div>
        </Form>
    </div>
  );
};

export default ContactForm;
