const express = require("express");
const shopifyRouter = require("./shopifyRoute");
const loginRouter = require("./loginRoute");
const successRouter = require("./successRoute");

const router = express.Router();

router.use("/shopify", shopifyRouter);
router.use("/login", loginRouter);
router.use("/success", successRouter);

module.exports = router;
