import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserById, fetchActivitiesByUser, fetchPostsByUser, likePost } from '../Utils/Api';
import { User } from '../Types/User';
import { Activity } from '../Types/Activity';
import { Post } from '../Types/Post';
import ActivityCard from '../Components/Activity/ActivityCard';
import PostCard from '../Components/Posts/PostCard';

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadProfile = async () => {
      if (userId) {
        const userData = await fetchUserById(userId);
        const userActivities = await fetchActivitiesByUser(userId);
        const userPosts = await fetchPostsByUser(userId);

        setUser(userData);
        setActivities(userActivities);
        setPosts(userPosts);
      }
    };

    loadProfile();
  }, [userId]);

  const handleLikePost = async (postId: string) => {
    const updatedPost = await likePost(postId);
    if (updatedPost) {
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? updatedPost : post))
      );
    }
  };

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div>
      <h1>{user.name}'s Profile</h1>
      <p>Total Points: {user.totalPoints}</p>

      <h2>Recent Activities</h2>
      {activities.length > 0 ? (
        activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))
      ) : (
        <p>No activities found.</p>
      )}

      <h2>Recent Posts</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard key={post.id} post={post} onLike={handleLikePost} />
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default ProfilePage;
