import React from 'react';
import { string, func } from 'prop-types';
import Form from 'react-bootstrap/Form';

import Button from 'app/components/Button';

const LoginForm = ({ onSubmit, text }) => {
  return (
    <Form onSubmit={onSubmit} style={{ marginTop: '50px' }}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="text" placeholder="Type your login" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder="Type your password:" />
      </Form.Group>
      <Button text={text} />
    </Form>
  );
};

LoginForm.propTypes = {
  onSubmit: func.isRequired,
  text: string.isRequired,
};
LoginForm.defaultProps = {
  text: '',
};

export default LoginForm;
