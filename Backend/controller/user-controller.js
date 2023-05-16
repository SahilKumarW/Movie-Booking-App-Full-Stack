const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Bookings = require('../models/Bookings');


const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        return console.log(err);
    }
    if (!users) {
        return res.status(500).json({ message: "Unexpected Error Occurred" });
    }
    return res.status(200).json({ users });
};

const Login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email && email.trim() === "" && !password && password.trim() === "") {
        return res.status(422).json({ message: "Invalid Input" })
    }

    let existingUser;

    try {
        existingUser = await User.findOne({ email });
    } catch (loginError) {
        return res.send(loginError.message);
    }

    if (!existingUser) {
        return res.status(400).json({ message: "User not found!" });
    }

    const correctPassword = bcrypt.compareSync(password, existingUser.password);
    if (!correctPassword) {
        return res.status(402).json({ message: "Incorrect Password" });
    }

    return res.status(200).json({ message: "Login Successful", id: existingUser._id });

};

const SignUp = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name && name.trim() === "" && !email && email.trim() === "" && !password && password.trim() === "") {
        return res.status(422).json({ message: "Invalid Input" })
    }

    const hashedPassword = bcrypt.hashSync(password);

    let user;
    try {
        user = new User({ name, email, password: hashedPassword });
        user = await user.save();
    } catch (err) {
        return console.log(err);
    }
    if (!user) {
        return res.status(500).json({ message: "Unexpected Error Occurred" });
    }
    return res.status(201).json({ id: user._id });
};

const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
    if (!name && name.trim() === "" && !email && email.trim() === "" && !password && password.trim() === "") {
        return res.status(422).json({ message: "Invalid Input" })
    }

    const hashedPassword = bcrypt.hashSync(password);

    let user;
    try {
        user = await User.findByIdAndUpdate(id, { name, email, password });
    } catch (error) {
        return res.send(error.message);
    }
    if (!user) {
        return res.status(500).json({ message: "Something went wrong" });
    }
    res.status(200).json({ message: "Updated successfully", User: user });
};

const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    let userToBeDeleted;
    try {
        userToBeDeleted = await User.findByIdAndRemove(id);
    } catch (error) {
        return res.send(error.message);
    }
    if (!userToBeDeleted) {
        return res.status(500).json({ message: "Something went wrong" });
    }
    res.status(200).json({ message: "Deleted successfully", User: userToBeDeleted });
};

const getBookingofUser = async (req, res, next) => {
    const id = req.params.id;
    let bookings;
    try {
        bookings = await Bookings.find({ User: id }).populate("User Movie");
    } catch (err) {
        return console.log(err)
    }
    if (!bookings) {
        return res.status(500).json({ message: "Uexpected Error Occured." })
    }
    return res.status(201).json({ bookings });
}

const getUserById = async (req, res, next) => {
    const id = req.params.id;
    let userToGet;
    try {
        userToGet = await User.findById(id);
    } catch (e) {
        return console.log(e);
    }
    if (!userToGet) {
        return res.status(500).json({ message: "Unexpected Error Occured" })
    }
    return res.status(200).json({ userToGet })
}

module.exports = { getAllUsers, Login, SignUp, updateUser, deleteUser, getBookingofUser, getUserById };