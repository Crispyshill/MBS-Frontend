import { User } from '../Types/User';
import { Activity } from '../Types/Activity';
import { Post } from '../Types/Post';


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
console.log("Backend Url: " + BACKEND_URL)





export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
  console.log("loginApi called")
  
  if (!BACKEND_URL) {
    console.log("Backend url is not defined")
    throw new Error(`Environment variable ${BACKEND_URL} is not defined`);
  }
  if (!process.env.REACT_APP_LOGIN_ENDPOINT) {
    console.log("login endpoint is not defined")
    throw new Error(`Environment variable ${process.env.REACT_APP_LOGIN_ENDPOINT} is not defined`);
  }
  const login_url: string = BACKEND_URL + process.env.REACT_APP_LOGIN_ENDPOINT
  console.log("login url: " + login_url)
  const response = await fetch(login_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }
  return response.json();
}

/**
 * Fetch a list of all activities.
 */
export const fetchActivities = async (): Promise<Activity[]> => {
  const activities: Activity[] = [
    { id: '1', name: 'Morning Run', type: 'exercise', points: 50, date: '2024-12-01', userId: '123' },
    { id: '2', name: 'Yoga', type: 'mindfulness', points: 30, date: '2024-12-02', userId: '123' },
    { id: '3', name: 'Study Session', type: 'study', points: 40, date: '2024-12-03', userId: '124' },
  ];

  return activities;
};

/**
 * Fetch activities performed by a specific user.
 */
export const fetchActivitiesByUser = async (userId: string): Promise<Activity[]> => {
  const activities = await fetchActivities();
  return activities.filter((activity) => activity.userId === userId);
};

/**
 * Fetch a list of all users.
 */
export const fetchUsers = async (): Promise<User[]> => {
  const users = [
    { id: '123', name: 'Alice', totalPoints: 130 },
    { id: '124', name: 'Bob', totalPoints: 90 },
    { id: '125', name: 'Charlie', totalPoints: 70 },
  ];

  return users;
};

/**
 * Fetch a user by their ID.
 */
export const fetchUserById = async (userId: string): Promise<User | null> => {
  const users = await fetchUsers();
  return users.find((user) => user.id === userId) || null;
};

/**
 * Fetch all posts.
 */
export const fetchPosts = async (): Promise<Post[]> => {
  const posts = [
    { id: '1', content: 'Had a great run today!', date: '2024-12-01', userId: '123', likes: 10 },
    { id: '2', content: 'Yoga helped me relax.', date: '2024-12-02', userId: '123', likes: 8 },
    { id: '3', content: 'Studied for 3 hours. Feeling accomplished!', date: '2024-12-03', userId: '124', likes: 5 },
  ];

  return posts;
};

/**
 * Fetch posts made by a specific user.
 */
export const fetchPostsByUser = async (userId: string): Promise<Post[]> => {
  const posts = await fetchPosts();
  return posts.filter((post) => post.userId === userId);
};

/**
 * Add a new activity.
 */
export const addActivity = async (activity: Omit<Activity, 'id'>): Promise<Activity> => {
  const newActivity: Activity = {
    ...activity,
    id: `${Date.now()}`, // Generate a unique ID (e.g., based on timestamp)
  };

  // Simulate saving to the database
  console.log('Added activity:', newActivity);

  return newActivity;
};

/**
 * Add a new post.
 */
export const addPost = async (post: Omit<Post, 'id' | 'likes'>): Promise<Post> => {
  const newPost: Post = {
    ...post,
    id: `${Date.now()}`, // Generate a unique ID
    likes: 0, // Initialize likes to 0
  };

  // Simulate saving to the database
  console.log('Added post:', newPost);

  return newPost;
};

/**
 * Like a post.
 */
export const likePost = async (postId: string): Promise<Post | null> => {
  const posts = await fetchPosts();
  const post = posts.find((p) => p.id === postId);

  if (post) {
    post.likes += 1;
    console.log(`Post ${postId} liked! Total likes: ${post.likes}`);
    return post;
  }

  return null;
};



