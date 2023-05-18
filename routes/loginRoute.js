const express = require("express");
const { loginWhatsapp } = require("../controllers/loginController");

const loginRouter = express.Router();

loginRouter.get("/", loginWhatsapp);

module.exports = loginRouter;
