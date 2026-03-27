const express = require("express");
const router = express.Router();

// import feature routers
const authRouter = require("./auth.routes");
const counterRouter = require("./counter.route");
const userRoutes = require("./user.routes");

// mount routes
router.use("/auth", authRouter);
router.use("/counter", counterRouter);
router.use("/users", userRoutes);

module.exports = router;
