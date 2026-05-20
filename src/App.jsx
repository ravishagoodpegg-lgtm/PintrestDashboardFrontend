import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Feed from './pages/Feed';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePin from './pages/CreatePin';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white text-gray-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={
              <PrivateRoute><CreatePin /></PrivateRoute>
            } />
            <Route path="/profile/:id" element={
              <PrivateRoute><Profile /></PrivateRoute>
            } />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}