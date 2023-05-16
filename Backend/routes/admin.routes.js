const express = require('express');
const AdminRouter = express.Router();

const { addAdmin, adminLogin, getAdmins, getAdminByID } = require('../controller/admin-controller');

AdminRouter.post("/signup", addAdmin);
AdminRouter.post("/login", adminLogin);
AdminRouter.get('/',getAdmins);
AdminRouter.get("/:id", getAdminByID);

module.exports = AdminRouter;