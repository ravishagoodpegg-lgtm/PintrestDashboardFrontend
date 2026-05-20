import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold tracking-tight">MoodBoard</Link>
      
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link to="/create" className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800">
              Create
            </Link>
            <Link to={`/profile/${user._id}`} className="text-sm font-medium hover:underline">
              {user.name}
            </Link>
            <button onClick={logout} className="text-sm text-gray-500 hover:text-black">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm font-medium hover:underline">Log in</Link>
            <Link to="/register" className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}