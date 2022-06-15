require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const { SERVER_PORT } = process.env;

// destructure controller file functions to use in endpoints
const { seed, getAircraft, getTime } = require("./controller.js");

app.use(express.json());
app.use(cors());

// Dev
app.post("/seed", seed);

//POST REQUESTS FOR CALC:
// post to /time
// send plane type and distance

// post to /fuel
// send plane type and distance

// post to /fuelcost
// send plane type and distance

//Server could respond with an array with all of these "trips"
// Have a single GET endpoint that would get any existing trips and display them

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
app.get("/js", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.js"));
});
app.get("/css", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/styles.css"));
});

// Aircraft - referencing controller file functions
app.get("/aircraft", getAircraft);
app.post("/time", getTime);

// Fuel Price

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`));
