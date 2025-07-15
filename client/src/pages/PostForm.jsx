import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';

function PostForm({ edit }) {
  const { id } = useParams();
  const [post, setPost] = useState({ title: '', content: '', category: '', image: null });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/categories').then(res => setCategories(res.data));
    if (edit && id) {
      axios.get(`/posts/${id}`).then(res =>
        setPost({
          title: res.data.title,
          content: res.data.content,
          category: res.data.category?._id,
          image: null
        })
      );
    }
  }, [edit, id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setPost({ ...post, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('title', post.title);
    form.append('content', post.content);
    form.append('category', post.category);
    if (post.image) form.append('image', post.image);

    const method = edit ? 'put' : 'post';
    const url = edit ? `/posts/${id}` : '/posts';
    await axios[method](url, form);
    navigate('/');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">{edit ? 'Edit' : 'Create'} Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" name="title" value={post.title} onChange={handleChange} placeholder="Title" required className="border p-2" />
        <textarea name="content" value={post.content} onChange={handleChange} placeholder="Content" required className="border p-2" />
        <select name="category" value={post.category} onChange={handleChange} required className="border p-2">
          <option value="">Select Category</option>
          {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
        </select>
        <input type="file" name="image" onChange={handleChange} />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">{edit ? 'Update' : 'Create'} Post</button>
      </form>
    </div>
  );
}
export default PostForm;
