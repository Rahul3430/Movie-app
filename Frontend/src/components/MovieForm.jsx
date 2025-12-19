import { useState } from "react";

export default function MovieForm({ onSubmit, initialData = {} }) {
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    timestamp: 0,
    duration: "",
    genre: "",
    poster: "",
    ...initialData
  });

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(movie);
      }}
      className="bg-[#1f1f1f] p-6 rounded space-y-4"
    >
      {["title", "description", "poster", "duration", "timestamp"].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field}
          value={movie[field]}
          onChange={handleChange}
          className="w-full p-2 bg-black text-white border border-gray-700 rounded"
        />
      ))}

      <button className="bg-[#E50914] w-full py-2 rounded">
        Save Movie
      </button>
    </form>
  );
}
