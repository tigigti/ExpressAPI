// Import Middleware and Router
// Assemble the API from various pieces

const express = require("express");
const app = express();

// Import Middleware
const bodyParser = require("body-parser");
const cors = require("cors");

// Import Router
const authRouter = require("./controllers/auth");

// Apply Middleware
app.use(bodyParser.json());
app.use(cors());

// Apply Router
app.use("/api/auth", authRouter);

module.exports = app;
