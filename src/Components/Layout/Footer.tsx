import React from 'react';

const Footer: React.FC = () => (
  <footer style={styles}>
    <p>&copy; 2024 MindBodySpirit | Connect Mind, Body, and Spirit.</p>
  </footer>
);

const styles: React.CSSProperties = {
  textAlign: 'center',
  padding: '10px 20px',
  background: '#4CAF50',
  color: 'white',
  position: 'fixed', // Correctly typed as a CSS position value
  bottom: 0,
  width: '100%',
  boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
};

export default Footer;
