import React, { useState } from 'react';
import PostCard from './PostCard';
import { Post } from '../../Types/Post';
import { likePost } from '../../Utils/Api';

const PostList: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const [postList, setPostList] = useState<Post[]>(posts);

  const handleLike = async (postId: string) => {
    const updatedPost = await likePost(postId);
    if (updatedPost) {
      setPostList((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? updatedPost : post))
      );
    }
  };

  return (
    <div>
      {postList.map((post) => (
        <PostCard key={post.id} post={post} onLike={handleLike} />
      ))}
    </div>
  );
};

export default PostList;
