import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ search, setSearch, onLogout }) => {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      setIsAdmin(true);
    }
  }, []);

  return (
    <nav className="bg-black border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-extrabold text-white">
          <span className="bg-yellow-400 text-black px-2 py-1 rounded">
            Movie App
          </span>
        </h1>

        {/* Search (Desktop) */}
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="hidden md:block w-72 px-4 py-2 rounded
          bg-[#121212] text-white border border-gray-700
          focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        {/* Desktop Actions */}
        <div className="hidden md:flex gap-4 items-center">
          {/* 🔐 Admin Only */}
          {isAdmin && (
            <Link
              to="/admin"
              className="px-4 py-2 rounded font-semibold
              bg-yellow-400 text-black hover:bg-yellow-300 transition"
            >
              Admin Dashboard
            </Link>
          )}

          <button
            onClick={onLogout}
            className="px-4 py-2 rounded font-semibold
            bg-red-600 hover:bg-red-700 transition text-white"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mt-5 space-y-4 md:hidden">
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded
            bg-[#121212] text-white border border-gray-700
            focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          {/* 🔐 Admin Only (Mobile) */}
          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="block text-center px-4 py-2 rounded font-semibold
              bg-yellow-400 text-black hover:bg-yellow-300 transition"
            >
              Admin Dashboard
            </Link>
          )}

          <button
            onClick={onLogout}
            className="w-full px-4 py-2 rounded font-semibold
            bg-red-600 hover:bg-red-700 transition text-white"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
