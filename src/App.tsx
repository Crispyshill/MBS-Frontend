import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import Footer from './Components/Layout/Footer';
import Home from './Pages/Home';
import Activities from './Pages/Activities';
import LeaderboardPage from './Pages/Leaderboard';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import ProtectedRoute from './Components/ProtectedRoute';

const App: React.FC = () => (
  <Router>
    <Navbar />
    <div style={{ padding: '20px' }}>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute> } />
        <Route path="/activities" element={<ProtectedRoute><Activities /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
        <Route path="/profile/:userId" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </div>
    <Footer />
  </Router>
);

export default App;
