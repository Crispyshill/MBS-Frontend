import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import Footer from './Components/Layout/Footer';
import Home from './Pages/Home';
import Activities from './Pages/Activities';
import LeaderboardPage from './Pages/Leaderboard';
import Profile from './Pages/Profile';

const App: React.FC = () => (
  <Router>
    <Navbar />
    <div style={{ padding: '20px' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/profile/:userId" element={<Profile />} />
      </Routes>
    </div>
    <Footer />
  </Router>
);

export default App;
