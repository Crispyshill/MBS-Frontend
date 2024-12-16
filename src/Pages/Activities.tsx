import React, { useState, useEffect } from 'react';
import ActivityCard from '../Components/Activity/ActivityCard';
import { Activity } from '../Types/Activity';
import { fetchActivities } from '../Utils/Api';

const Activities: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const loadActivities = async () => {
      const data = await fetchActivities();
      setActivities(data);
    };
    loadActivities();
  }, []);

  return (
    <div>
      <h2>Your Activities</h2>
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
};

export default Activities;
