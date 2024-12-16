import React, { useState, useEffect } from 'react';
import Leaderboard from '../Components/Leaderboard/Leaderboard';
import { User } from '../Types/User';
import { fetchUsers } from '../Utils/Api';

const LeaderboardPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };
    loadUsers();
  }, []);

  return <Leaderboard users={users} />;
};

export default LeaderboardPage;
