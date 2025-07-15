import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('/auth/register', form);
    navigate('/login');
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="username" onChange={handleChange} value={form.username} placeholder="Username" className="border p-2" />
        <input name="password" type="password" onChange={handleChange} value={form.password} placeholder="Password" className="border p-2" />
        <button type="submit" className="bg-green-600 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}
export default Register;
