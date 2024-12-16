import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const currentUserId = '123'; // Assume the logged-in user's ID is available

  return (
    <nav style={styles.navbar}>
      <h1>MindBodySpirit</h1>
      <ul style={styles.links}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/activities">Activities</Link></li>
        <li><Link to="/posts">Posts</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        <li><Link to={`/profile/${currentUserId}`}>My Profile</Link></li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    background: '#4CAF50',
    color: 'white',
  },
  links: {
    listStyleType: 'none',
    display: 'flex',
    gap: '15px',
  },
};

export default Navbar;
