"use client";
import { BaseSyntheticEvent, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function SignUp() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: BaseSyntheticEvent) => {
    const form: HTMLFormElement = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <Container>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="signUpFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" required />
              <Form.Control.Feedback type="invalid">
                First Name is required
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="signUpLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" required />
              <Form.Control.Feedback type="invalid">
                Last Name is required
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="signUpUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" required />
          <Form.Control.Feedback type="invalid">
            Username is required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="signUpEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" required />
          <Form.Control.Feedback type="invalid">
            Email is required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="signUpPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required />
          <Form.Control.Feedback type="invalid">
            Password is required
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
