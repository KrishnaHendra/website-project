const express = require("express");
const shopifyRouter = require("./shopifyRoute");
const loginRouter = require("./loginRoute");
const successRouter = require("./successRoute");
const bitloginRouter = require("./bitloginRoute");

const router = express.Router();

router.use("/shopify", shopifyRouter);
router.use("/bitlogin", bitloginRouter);
router.use("/login", loginRouter);
router.use("/success", successRouter);

module.exports = router;
