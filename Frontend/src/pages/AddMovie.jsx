import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import AdminNavbar from "../components/AdminNavbar";

export default function AddMovie() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    rating: 0,
    releaseDate: "",
    genre: "",
    duration: "",
    poster: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      // Prepare payload with correct types
      const payload = {
        title: form.title,
        description: form.description,
        poster: form.poster,
        rating: form.rating ? Number(form.rating) : 0,
        duration: form.duration ? Number(form.duration) : undefined,
        genre: form.genre
          ? form.genre.split(",").map((g) => g.trim())
          : [],
        releaseDate: form.releaseDate || undefined
      };

      await api.post("/movies", payload);
      navigate("/admin");
    } catch (error) {
      console.error("Add movie error:", error);
      alert("Failed to add movie. Check console for details.");
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="p-6 bg-black min-h-screen text-white">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-gray-400 hover:text-yellow-400 transition"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-bold mb-6">
          Add <span className="text-yellow-400">Movie</span>
        </h1>

        <form
          onSubmit={submit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl"
        >
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="p-3 rounded bg-[#121212] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            name="poster"
            value={form.poster}
            onChange={handleChange}
            placeholder="Poster URL"
            className="p-3 rounded bg-[#121212] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="number"
            name="rating"
            value={form.rating}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
            placeholder="Rating"
            className="p-3 rounded bg-[#121212] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="number"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="Duration (min)"
            className="p-3 rounded bg-[#121212] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="date"
            name="releaseDate"
            value={form.releaseDate}
            onChange={handleChange}
            className="p-3 rounded bg-[#121212] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            name="genre"
            value={form.genre}
            onChange={handleChange}
            placeholder="Genres (comma separated)"
            className="p-3 rounded bg-[#121212] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows="4"
            className="p-3 rounded bg-[#121212] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 md:col-span-2 resize-none"
          />

          <button
            className="md:col-span-2 mt-4 py-3 rounded font-semibold bg-yellow-500 hover:bg-yellow-600 transition"
          >
            Add Movie
          </button>
        </form>
      </div>
    </>
  );
}
