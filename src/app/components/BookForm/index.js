import React from 'react';
import { func } from 'prop-types';
import Form from 'react-bootstrap/Form';

import Button from 'app/components/Button';

const BookForm = ({ onSubmit }) => {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          required="true"
          placeholder="Type book's title"
        />
      </Form.Group>
      <Form.Group controlId="formBasicAuthor">
        <Form.Label>Author:</Form.Label>
        <Form.Control
          type="text"
          required="true"
          placeholder="Type book's author"
        />
      </Form.Group>
      <Form.Group controlId="formBasicYear">
        <Form.Label>Year:</Form.Label>
        <Form.Control
          type="number"
          required="true"
          placeholder="Type book's year"
        />
      </Form.Group>
      <Button text="Add!" />
    </Form>
  );
};

BookForm.propTypes = {
  onSubmit: func.isRequired,
};

export default BookForm;
