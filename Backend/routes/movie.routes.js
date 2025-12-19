const express = require('express');
const router = express.Router();

const {authMiddleware} = require('../middleware/auth.middleware');
const {admin} = require('../middleware/admin.middleware');

const {
    getMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie
} = require('../controllers/movie.controller');



router.get('/', authMiddleware, getMovies);
router.get('/:id', authMiddleware, getMovieById);

router.post('/', authMiddleware, admin, addMovie);
router.put('/:id', authMiddleware , admin, updateMovie);
router.delete('/:id', authMiddleware, admin, deleteMovie);



module.exports = router;