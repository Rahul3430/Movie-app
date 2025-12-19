import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ✅ Auto-redirect if already logged in
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await api.get('/auth/profile');
        if (res.data.user.role === 'admin') {
          navigate('/admin', { replace: true });
        } else if (res.data.user) {
          navigate('/home', { replace: true });
        }
      } catch (err) {
        // do nothing if not logged in
      }
    };
    checkLogin();
  }, [navigate]);

  const handleChange = (e) => {
    setError('');
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/auth/register', form);

      // store token & role if backend returns it
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);

      // redirect based on role
      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="w-[380px] bg-[#121212] border border-gray-800 rounded-lg p-8 shadow-2xl"
      >
        <h1 className="text-center text-3xl font-extrabold mb-6">
          <span className="bg-yellow-400 text-black px-3 py-1 rounded">
            Movie App
          </span>
        </h1>

        <h2 className="text-white text-xl font-semibold mb-5">
          Create account
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-900/20 border border-red-500 px-3 py-2 rounded">
            {error}
          </div>
        )}

        <label className="block text-sm text-gray-300 mb-1">Name</label>
        <input
          name="name"
          placeholder="Enter your name"
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 rounded bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <label className="block text-sm text-gray-300 mb-1">Email</label>
        <input
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 rounded bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <label className="block text-sm text-gray-300 mb-1">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Create a password"
          onChange={handleChange}
          className="w-full mb-5 px-3 py-2 rounded bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <button
          className="w-full py-2 rounded font-semibold text-black bg-yellow-400 hover:bg-yellow-300 transition"
        >
          Register
        </button>

        <p className="mt-5 text-sm text-center text-gray-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-yellow-400 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
