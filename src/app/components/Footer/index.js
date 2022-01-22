import React from 'react';

const Footer = () => {
  return (
    <footer
      className="text-center text-lg-start text-dark mt-auto"
      style={{
        backgroundColor: '#ECEFF1',
        position: 'fixed',
        bottom: 0,
        width: '100%',
      }}
    >
      <div
        className="text-center p-3"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        © 2022 Made by Patryk Zych and Dawid Karaś
      </div>
    </footer>
  );
};

export default Footer;
