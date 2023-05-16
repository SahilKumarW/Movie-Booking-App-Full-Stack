const Admin = require("../models/Admin");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const addAdmin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email && email.trim() === "" && !password && password.trim() === "") {
        return res.status(422).json({ message: "Invalid Inputs" })
    }
    let existingAdmin;

    try {
        existingAdmin = await Admin.findOne({ email });
    } catch (error) {
        return console.log(error);
    }
    if (existingAdmin) {
        return res.status(400).json({ message: "Admin Already Exists" });
    }

    let admin;
    const hashedAdminPassword = bcrypt.hashSync(password);
    try {
        admin = new Admin({ email, password: hashedAdminPassword });
        admin = await admin.save();
    } catch (error) {
        return console.log(error);
    }

    if (!admin) {
        return res.status(500).json({ message: "Unable to Store Admin Credentials.." });
    }
    return res.status(201).json({ admin });
};

const adminLogin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email && email.trim() === "" && !password && password.trim() === "") {
        return res.status(422).json({ message: "Invalid Inputs" })
    }

    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({ email });
    } catch (error) {
        return console.log(error);
    }

    if (!existingAdmin) {
        return res.status(401).json({ message: "Admin Not Found" });
    }

    const correctPassword = bcrypt.compareSync(password, existingAdmin.password);
    if (!correctPassword) {
        return res.status(400).json({ message: "Incorrect Password" });
    }
    const token = jwt.sign({ id: existingAdmin._id }, process.env.SECRET_KEY, { expiresIn: "7d" });
    return res.status(200).json({ message: "Login Successful", token, id: existingAdmin._id });
};

const getAdmins = async (req, res) => {
    let admins;
    try {
        admins = await Admin.find();
    }
    catch (e) {
        return res.send(e.message);
    }
    if (!admins) {
        return res.status(400).json({ message: "Cannot get ADMIN" });
    }
    return res.status(200).json({ admins });
};

const getAdminByID = async (req, res, next) => {
    const id = req.params.id;
    let admin;
    try {
        admin = await Admin.findById(id)
            .populate("addedMovies");
    } catch (err) {
        return console.log(err);
    }
    if (!admin) {
        return console.log("Cannot find Admin");
    }
    return res.status(200).json({ admin })
};

module.exports = { addAdmin, adminLogin, getAdmins, getAdminByID }