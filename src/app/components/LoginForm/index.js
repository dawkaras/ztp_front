import React from 'react';
import { func } from 'prop-types';
import Form from 'react-bootstrap/Form';

import Button from 'app/components/Button';

const LoginForm = ({ onSubmit }) => {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Login:</Form.Label>
        <Form.Control type="text" placeholder="Type your login" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder="Type your password:" />
      </Form.Group>
      <Button text="Login!" />
    </Form>
  );
};

LoginForm.propTypes = {
  onSubmit: func.isRequired,
};

export default LoginForm;
