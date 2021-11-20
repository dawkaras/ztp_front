import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';

const ButtonComp = ({ text }) => (
  <Button color="primary" type="submit">
    {text}
  </Button>
);

ButtonComp.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ButtonComp;
