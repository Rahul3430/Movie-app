import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import api from "../utils/api";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    try {
      setLoading(true);

      const res = await api.get("/movies", {
        params: {
          search,
          sort,
          page,
          limit: 8,
        },
        withCredentials: true,
      });

      setMovies(Array.isArray(res.data.movies) ? res.data.movies : []);
      setPages(res.data.pages || 1);
    } catch (error) {
      console.error("Fetch movies error:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [search, sort, page]);

  const logout = async () => {
    await api.post("/auth/logout", {}, { withCredentials: true });
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar search={search} setSearch={setSearch} onLogout={logout} />

      {/* Sort Bar */}
      <div className="px-6 py-4 flex justify-end">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-[#121212] border border-gray-700 text-white px-4 py-2 rounded
          focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">Sort By</option>
          <option value="latest">Latest</option>
          <option value="rating">Rating</option>
          <option value="duration">Duration</option>
        </select>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center text-gray-400 mt-16 text-lg">
          Loading movies...
        </p>
      ) : movies.length === 0 ? (
        <p className="text-center text-gray-400 mt-16 text-lg">
          No movies found
        </p>
      ) : (
        <div className="px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-6 my-8">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-5 py-2 rounded bg-gray-800 hover:bg-gray-700
          disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          Prev
        </button>

        <span className="text-gray-300">
          Page <span className="text-yellow-400 font-semibold">{page}</span> of{" "}
          {pages}
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
  );
};

export default Home;
