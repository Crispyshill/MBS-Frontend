import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store"; // Adjust the import path for your Redux store
import { logout } from "../../store/authSlice"; // Adjust the import path for your auth slice
import { useNavigate } from "react-router-dom";


const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);
  const currentUserId = "123"; // Replace with actual user ID logic if available

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // Redirect to login page after logout
  };


  return (
    <nav style={styles.navbar}>
      <h1>MindBodySpirit</h1>
      <ul style={styles.links}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/activities">Activities</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        <li><Link to="challenges">Challenges</Link></li>
        {isAuthenticated && (
          <li>
            <Link to={`/profile/${currentUserId}`}>My Profile</Link>
          </li>
        )}
        <li style={styles.authLink}>
          {isAuthenticated ? (
            <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
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
  authLink: {
    marginLeft: "auto", // Ensures the login/logout button is pushed to the right
  },
  logoutButton: {
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Navbar;
