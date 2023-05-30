const express = require("express");
const {
  getShopifyCustomer,
  postShopifyCustomer,
} = require("../controllers/shopifyController");

const shopifyRouter = express.Router();

shopifyRouter.get("/", getShopifyCustomer);
shopifyRouter.post("/customer", postShopifyCustomer);

module.exports = shopifyRouter;
