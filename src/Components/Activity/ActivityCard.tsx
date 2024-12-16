import React from 'react';
import { Activity } from '../../Types/Activity';

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => (
  <div style={styles.card}>
    <h3>{activity.name}</h3>
    <p>Type: {activity.type}</p>
    <p>Points: {activity.points}</p>
    <p>Date: {activity.date}</p>
  </div>
);

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px 0',
    boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
  },
};

export default ActivityCard;
