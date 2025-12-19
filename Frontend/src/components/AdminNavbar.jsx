import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../utils/api";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await api.post("/auth/logout");
    navigate("/login");
  };

  return (
    <nav className="bg-black border-b border-gray-800 px-6 py-4">
      {/* Top Bar */}
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-extrabold">
          <span className="text-yellow-400">Movies App</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center text-gray-300">
          <Link
            to="/"
            className="hover:text-yellow-400 hover:border-b-2 hover:border-yellow-400 pb-1 transition"
          >
            Home
          </Link>

          <Link
            to="/admin"
            className="hover:text-yellow-400 hover:border-b-2 hover:border-yellow-400 pb-1 transition"
          >
            Movies
          </Link>

          <Link
            to="/admin/add"
            className="hover:text-yellow-400 hover:border-b-2 hover:border-yellow-400 pb-1 transition"
          >
            Add Movie
          </Link>

          <button
            onClick={logout}
            className="ml-4 px-4 py-1.5 rounded font-semibold
            bg-yellow-500 hover:bg-yellow-600 transition text-black"
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
        <div className="md:hidden mt-6 space-y-4 text-gray-300">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="block hover:text-yellow-400 transition"
          >
            Home
          </Link>

          <Link
            to="/admin"
            onClick={() => setOpen(false)}
            className="block hover:text-yellow-400 transition"
          >
            Movies
          </Link>

          <Link
            to="/admin/add"
            onClick={() => setOpen(false)}
            className="block hover:text-yellow-400 transition"
          >
            Add Movie
          </Link>

          <button
            onClick={logout}
            className="w-full mt-2 px-4 py-2 rounded font-semibold
            bg-yellow-500 hover:bg-yellow-600 transition text-black"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
