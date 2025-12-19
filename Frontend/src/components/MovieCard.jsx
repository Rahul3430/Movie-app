const MovieCard = ({ movie }) => {
  return (
    <div
      className="bg-[#121212] border border-gray-800 rounded-xl overflow-hidden
      text-white transform hover:scale-[1.03]
      hover:border-yellow-400 hover:shadow-2xl
      transition duration-300"
    >
      {/* Poster */}
      <div className="h-64 bg-black flex items-center justify-center">
        <img
          src={movie.poster || "https://via.placeholder.com/300"}
          alt={movie.title}
          className="h-full w-full object-contain hover:opacity-90 transition"
        />
      </div>

      {/* Details */}
      <div className="p-4">
        <h2 className="text-lg font-bold truncate">
          {movie.title}
        </h2>

        <p className="text-sm text-gray-400 mt-2 line-clamp-3">
          {movie.description}
        </p>

        <div className="mt-4 text-sm space-y-1 text-gray-300">
          <div>
            <span className="text-yellow-400">⭐</span> {movie.rating}
          </div>
          <div>
            <span className="text-yellow-400">⏱</span> {movie.duration} min
          </div>
          <div>
            <span className="text-yellow-400">📅</span>{" "}
            {movie.releaseDate?.split("T")[0]}
          </div>
          <div className="truncate">
            <span className="text-yellow-400">🎭</span>{" "}
            {movie.genre.join(", ")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
