import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/posts').then(res => setPosts(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Posts</h2>
      {posts.map(post => (
        <Link to={`/posts/${post._id}`} key={post._id} className="block border-b py-2">
          {post.title}
        </Link>
      ))}
    </div>
  );
}
export default PostList;