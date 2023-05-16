const jwt = require("jsonwebtoken")
const Movie = require("../models/Movies")
const mongoose = require('mongoose');
const admin = require("../models/Admin");

const addMovie = async (req, res, next) => {
    const extractedToken = req.headers.authorization.split(" ")[1];

    if (!extractedToken && extractedToken.trim() === "") {
        return res.status(404).json({ message: "Token not found" });
    }
    console.log(extractedToken);

    let adminId;

    // Verify Token
    jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid Token' })
        }
        else {
            adminId = decrypted.id;
            return;
        }
    });

    // Create New Movie
    const { title, description, releaseDate, posterURL, featured, actors } = req.body;
    console.log(req.body);

    if (res.status == 400) {
        res.send("error");
    }

    if (!title && title.trim() === '' && !description && description.trim() === '' && !posterURL && posterURL.trim() === '') {
        return res.status(422).json({ message: `Invalid Inputs` });
    }

    let movie;
    try {
        movie = new Movie
            (
                {
                    title,
                    description,
                    releaseDate: new Date(`${releaseDate}`),
                    posterURL,
                    featured,
                    actors,
                    admin: adminId
                }
            );
        const session = await mongoose.startSession();
        const adminUser = await admin.findById(adminId);

        session.startTransaction();
        await movie.save({ session })
        adminUser.addedMovies.push(movie);
        await adminUser.save({ session });

        await session.commitTransaction();
    } catch (error) {
        return res.send(error.message);
    }

    if (!movie) {
        return res.status(500).json({ message: "Request Failed" });
    }
    return res.status(201).json({ movie });
};

const getAllMovies = async (req, res, next) => {
    let movies;
    try {
        movies = await Movie.find();
    } catch (error) {
        return console.log(error);
    }

    if (!movies) {
        return res.status(500).json({ message: "Request Failed" });
    }
    return res.status(200).json({ movies });
};

const getMovieById = async (req, res, next) => {
    const ID = req.params.body;
    let movie;
    try {
        movie = await Movie.findById(ID);
    } catch (error) {
        return console.log(error);
    }
    if (!movie) {
        return res.status(404).json({ message: 'Invalid Movie ID' });
    }
    return res.status(200).json({ movie });
};

module.exports = { addMovie, getAllMovies, getMovieById };