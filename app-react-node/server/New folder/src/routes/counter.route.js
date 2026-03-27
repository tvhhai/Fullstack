const express = require("express");
const router = express.Router();
const controller = require("../controllers/counter.controller");

router.get("/", controller.getCounter);
router.post("/increment", controller.increment);

module.exports = router;
