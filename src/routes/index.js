const express = require("express");
const router = express.Router();
// import middleware
const authMiddleware = require("@middlewares/auth");
// import sub-routes
const authRoute = require("./auth.route");
const userRoute = require("./user.route");


router.use("/auth", authRoute);
router.use("/users", authMiddleware, userRoute);

module.exports = router;