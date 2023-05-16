const express = require('express');
const MovieRouter = express.Router();

const { addMovie, getAllMovies, getMovieById } = require('../controller/movie-controller');

MovieRouter.post("/", addMovie);
MovieRouter.post("/:id", getMovieById);
MovieRouter.get("/", getAllMovies);

module.exports = MovieRouter;