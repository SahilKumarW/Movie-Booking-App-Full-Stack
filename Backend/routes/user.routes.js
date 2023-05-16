const express = require('express');
const UserRouter = express.Router();

const { getAllUsers, Login, SignUp, updateUser, deleteUser, getBookingofUser, getUserById, } = require('../controller/user-controller');

UserRouter.get("/", getAllUsers);
UserRouter.post("/login", Login);
UserRouter.post("/signup", SignUp);
UserRouter.put("/:id", updateUser);
UserRouter.delete("/:id", deleteUser);
UserRouter.get("/bookings/:id", getBookingofUser);
UserRouter.get("/:id", getUserById);

module.exports = UserRouter;