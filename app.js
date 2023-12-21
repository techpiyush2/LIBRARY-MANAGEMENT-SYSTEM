"use strict";
const cors = require("cors"),
  express = require("express"),
  bodyParser = require("body-parser"),
  authRoutes = require("./app/routes/authRoutes"),
  bookRoutes = require("./app/routes/bookRoutes"),
  checkoutRoutes = require("./app/routes/checkoutRoutes");

require("dotenv").config({ path: "./app/config/config.env" });

const app = express();

app.use(cors());

app.use(bodyParser.json());

// Including database file

require("./app/config/db");

// Including routes

app.use("/library", authRoutes);
app.use("/library", bookRoutes);
app.use("/library", checkoutRoutes);

// scheduling cron job

// Cron job to increment late return fine

require("./app/utils/overDueCron");

// Starting Server

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server running on port", port);
});
