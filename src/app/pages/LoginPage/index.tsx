/**
 *
 * LoginPage
 *
 */

import React from 'react';

import LoginForm from 'app/components/LoginForm';

import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

export const LoginPage = () => {
  const history = useHistory();
  const goLogin = event => {
    event.preventDefault();
    const username = event.target.elements.formBasicEmail.value;
    const password = event.target.elements.formBasicPassword.value;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    };

    // fetch('https:/localhost:3001/login', requestOptions).then(() => {
      history.push('/dashboard');
    // });
  };

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col lg={6}>
          <LoginForm onSubmit={goLogin} />
        </Col>
      </Row>
    </Container>
  );
};
