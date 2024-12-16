import React from 'react';
import { Post } from '../../Types/Post';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike }) => {
  const handleLike = () => {
    onLike(post.id);
  };

  return (
    <div style={styles.card}>
      <p style={styles.date}>{new Date(post.date).toLocaleDateString()}</p>
      <p style={styles.content}>{post.content}</p>
      <div style={styles.footer}>
        <span style={styles.likes}>
          ❤️ {post.likes} {post.likes === 1 ? 'Like' : 'Likes'}
        </span>
        <button style={styles.button} onClick={handleLike}>
          Like
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px 0',
    boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  date: {
    fontSize: '0.9rem',
    color: '#999',
    marginBottom: '10px',
  },
  content: {
    fontSize: '1.2rem',
    marginBottom: '10px',
    lineHeight: '1.5',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likes: {
    fontSize: '1rem',
    color: '#555',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default PostCard;
