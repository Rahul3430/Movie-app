import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import AdminNavbar from "../components/AdminNavbar";

export default function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.get(`/movies/${id}`);

        setForm({
          title: res.data.title || "",
          description: res.data.description || "",
          rating: res.data.rating || 0,
          duration: res.data.duration || "",
          poster: res.data.poster || "",
          genre: res.data.genre?.join(", ") || "",
          releaseDate: res.data.releaseDate
            ? res.data.releaseDate.split("T")[0]
            : ""
        });

        setLoading(false);
      } catch (err) {
        navigate("/admin");
      }
    };

    fetchMovie();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    await api.put(`/movies/${id}`, {
      ...form,
      genre: form.genre.split(",").map((g) => g.trim())
    });

    navigate("/admin");
  };

  if (loading || !form) {
    return (
      <>
        <AdminNavbar />
        <div className="p-6 bg-black min-h-screen text-gray-400">
          Loading movie...
        </div>
      </>
    );
  }

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
          Edit <span className="text-yellow-400">Movie</span>
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
            className="p-3 rounded bg-[#121212] border border-gray-700
            focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            name="poster"
            value={form.poster}
            onChange={handleChange}
            placeholder="Poster URL"
            className="p-3 rounded bg-[#121212] border border-gray-700
            focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="number"
            name="rating"
            value={form.rating}
            min="0"
            max="5"
            step="0.1"
            onChange={handleChange}
            placeholder="Rating"
            className="p-3 rounded bg-[#121212] border border-gray-700
            focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="number"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="Duration (min)"
            className="p-3 rounded bg-[#121212] border border-gray-700
            focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="date"
            name="releaseDate"
            value={form.releaseDate}
            onChange={handleChange}
            className="p-3 rounded bg-[#121212] border border-gray-700
            focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            name="genre"
            value={form.genre}
            onChange={handleChange}
            placeholder="Genres (comma separated)"
            className="p-3 rounded bg-[#121212] border border-gray-700
            focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            placeholder="Description"
            className="p-3 rounded bg-[#121212] border border-gray-700
            focus:outline-none focus:ring-2 focus:ring-yellow-400
            md:col-span-2 resize-none"
          />

          <button
            className="md:col-span-2 mt-4 py-3 rounded font-semibold
            bg-yellow-500 hover:bg-yellow-600 transition"
          >
            Update Movie
          </button>
        </form>
      </div>
    </>
  );
}
