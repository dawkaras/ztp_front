/**
 *
 * LoginPage
 *
 */

import React from 'react';

import LoginForm from 'app/components/LoginForm';

import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'app/components/Button';

export const LoginPage = () => {
  const history = useHistory();
  if (localStorage.getItem('user') != null) history.push('/movies');
  const goLogin = event => {
    event.preventDefault();
    const username = event.target.elements.formBasicEmail.value;
    const password = event.target.elements.formBasicPassword.value;
    let requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: username, password }),
    };
    fetch('https://localhost:5001/login', requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(result => {
            localStorage.setItem(
              'user',
              JSON.stringify({
                token: result.token,
                role: result.role,
                username,
              })
            );
            setTimeout(function () {
              history.push('/movies');
            }, 100);
          });
        } else {
          response.json().then(result => alert(result.message));
        }
      })
      .catch(error => {
        alert(error);
        history.push('/invalidCredentials');
      });
  };

  return (
    <Container fluid>
      <Row className="justify-content-md-center" style={{ marginTop: '55px' }}>
        <Col lg={6}>
          <LoginForm onSubmit={goLogin} text="Login!" />
          <span>You don't have an account? </span>
          <Button text="Register!" onClick={() => history.push('/register')} />
        </Col>
      </Row>
    </Container>
  );
};
