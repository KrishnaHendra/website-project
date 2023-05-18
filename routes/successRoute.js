const express = require("express");
const { loginSuccess } = require("../controllers/loginController");

const successRouter = express.Router();

successRouter.get("/", loginSuccess);

module.exports = successRouter;
