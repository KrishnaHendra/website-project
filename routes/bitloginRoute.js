const express = require("express");
const {
  getAuthWhatsapp,
  handleSuccessLogin,
} = require("../controllers/bitloginController");

const bitloginRouter = express.Router();

bitloginRouter.get("/auth-whatsapp", getAuthWhatsapp);
bitloginRouter.get("/auth-whatsapp-success", handleSuccessLogin);

module.exports = bitloginRouter;
