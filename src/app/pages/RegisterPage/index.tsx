/**
 *
 * LoginPage
 *
 */

import React from 'react';

import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Button from 'app/components/Button';

export const RegisterPage = () => {
  const history = useHistory();
  if (localStorage.getItem('user') != null) history.push('/movies');
  const register = event => {
    event.preventDefault();
    const username = event.target.elements.formBasicEmail.value;
    const password = event.target.elements.formBasicPassword.value;
    const confirmPassword =
      event.target.elements.formBasicConfirmPassword.value;
    if (confirmPassword == password) {
      let requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }),
      };
      fetch('https://localhost:5001/signup', requestOptions)
        .then(response => {
          if (response.ok) {
            history.push('/login');
          } else {
            response.json().then(result => {
              alert(result.message);
            });
          }
        })
        .catch(error => {
          alert(error);
        });
    } else alert('Passwords do not match!');
  };

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col lg={6}>
          <Form onSubmit={register} style={{ marginTop: '55px' }}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="text" placeholder="Type your login" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" placeholder="Type your password:" />
            </Form.Group>
            <span>
              Password need at least 5 chars, 1 big letter, 1 number, 1 special
              sign
            </span>
            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password:"
              />
            </Form.Group>
            <Button text="Register!" />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
