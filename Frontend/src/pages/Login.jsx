import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ✅ Auto-redirect if already logged in
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await api.get('/auth/profile'); // backend returns user info
        if (res.data.user.role === 'admin') {
          navigate('/admin', { replace: true }); // admin auto redirect
        } else if (res.data.user) {
          navigate('/home', { replace: true }); // normal user auto redirect
        }
      } catch (err) {
        // 🔹 Do NOTHING if not logged in
        // This prevents unauthorized error from showing prematurely
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
      const res = await api.post('/auth/login', form);

      // store token & role
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);

      // redirect based on role
      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="w-[360px] bg-[#121212] border border-gray-800 rounded-lg p-8 shadow-2xl"
      >
        <h1 className="text-center text-3xl font-extrabold mb-6">
          <span className="bg-[#F5C518] text-black px-2 py-1 rounded">
            Movie app
          </span>
        </h1>

        <h2 className="text-white text-xl font-semibold mb-5">
          Sign in
        </h2>

        {/* 🔹 Only show error on login attempt */}
        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-900/20 border border-red-500 px-3 py-2 rounded">
            {error}
          </div>
        )}

        <label className="block text-sm text-gray-300 mb-1">Email</label>
        <input
          name="email"
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full mb-4 px-3 py-2 rounded bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F5C518]"
        />

        <label className="block text-sm text-gray-300 mb-1">Password</label>
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full mb-5 px-3 py-2 rounded bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F5C518]"
        />

        <button
          className="w-full py-2 rounded font-semibold text-black bg-[#F5C518] hover:bg-yellow-400 transition"
        >
          Sign In
        </button>

        <p className="mt-5 text-sm text-center text-gray-400">
          New to Movie app?{' '}
          <Link
            to="/register"
            className="text-[#F5C518] font-semibold hover:underline"
          >
            Create your account
          </Link>
        </p>
      </form>
    </div>
  );
}
