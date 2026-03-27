const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const app = express();

// middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(require('cookie-parser')());
app.use(express.json());
app.use("/api", routes);
module.exports = app;


