import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <Link to="/" className="font-bold">Blog</Link>
      <div>
        {user ? (
          <>
            <span className="mr-2">Hello, {user.username}</span>
            <button onClick={logout}>Logout</button>
            <Link to="/create" className="ml-4">New Post</Link>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
export default Navbar;