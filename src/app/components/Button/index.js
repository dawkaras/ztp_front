import React from 'react';
import { string, func } from 'prop-types';
import Button from 'react-bootstrap/Button';

const ButtonComp = ({ text, onClick }) => (
  <Button
    color="primary"
    type="submit"
    onClick={() => onClick()}
    style={{ margin: '5px 0px' }}
  >
    {text}
  </Button>
);

ButtonComp.propTypes = {
  text: string.isRequired,
  onClick: func,
};

ButtonComp.defaultProps = {
  onClick: () => {},
};

export default ButtonComp;
