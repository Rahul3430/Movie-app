const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating:{
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    releaseDate: {
        type: Date,
    },
    genre: {
        type: [String],
        default: []
    },
    duration: Number,
    poster: {
        type: String,
        trim: true
    }
},{ timestamps: true});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;