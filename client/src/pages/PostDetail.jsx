import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`/posts/${id}`).then(res => setPost(res.data));
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <img src={post.image} className="my-4 max-w-md" />
      <p>{post.content}</p>
      <p className="mt-4 text-sm">Category: {post.category?.name}</p>
    </div>
  );
}
export default PostDetail;