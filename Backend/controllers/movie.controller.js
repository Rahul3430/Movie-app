const Movie = require('../models/movie');


module.exports.getMovies = async (req, res) => {
  try {
    const { search, sort, page = 1, limit = 10 } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    let sortOption = {};
    if (sort === 'latest') sortOption.releaseDate = -1;
    if (sort === 'rating') sortOption.rating = -1;
    if (sort === 'duration')sortOption.duration = 1;

    const skip = (page - 1) * limit;

    const movies = await Movie.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await Movie.countDocuments(query);

    res.status(200).json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      movies
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch movies',
      error
    });
  }
};




module.exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch movie',
      error
    });
  }
};


module.exports.addMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);

    res.status(201).json({
      message: 'Movie added successfully',
      movie
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to add movie',
      error
    });
  }
};


module.exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json({
      message: 'Movie updated successfully',
      movie
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update movie',
      error
    });
  }
};


module.exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json({
      message: 'Movie deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete movie',
      error
    });
  }
};
