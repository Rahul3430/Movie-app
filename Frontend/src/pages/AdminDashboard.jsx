import { useEffect, useState } from "react";
import api from "../utils/api";
import AdminNavbar from "../components/AdminNavbar";
import { Link } from "react-router-dom";

export default function AdminHome() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchMovies = async () => {
    const res = await api.get(`/movies?page=${page}&limit=5`);
    setMovies(res.data.movies);
    setPages(res.data.pages);
  };

  const deleteMovie = async (id) => {
    if (!confirm("Delete movie?")) return;
    await api.delete(`/movies/${id}`);
    fetchMovies();
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  return (
    <>
      <AdminNavbar />

      <div className="p-6 bg-black min-h-screen text-white">
        {/* <h1 className="text-2xl font-bold mb-6">
          <span className="text-yellow-400">Admin</span> Movies
        </h1> */}

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-800 rounded-lg overflow-hidden">
            <thead className="bg-[#121212] text-gray-300">
              <tr>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {movies.map((m) => (
                <tr
                  key={m._id}
                  className="border-t border-gray-800 hover:bg-[#25280e] transition"
                >
                  <td className="p-4 font-medium">{m.title}</td>

                  <td className="p-4 flex gap-6">
                    <Link
                      to={`/admin/edit/${m._id}`}
                      className="text-blue-400 hover:underline"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteMovie(m._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-6 mt-8 text-gray-300">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-5 py-2 rounded bg-gray-800 hover:bg-gray-700
            disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Previous
          </button>

          <span>
            Page <span className="text-yellow-400">{page}</span> / {pages}
          </span>

          <button
            disabled={page === pages}
            onClick={() => setPage(page + 1)}
            className="px-5 py-2 rounded bg-gray-800 hover:bg-gray-700
            disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
