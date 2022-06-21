require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const { SERVER_PORT } = process.env;

// destructured controller file functions to use in endpoints
const {
  seed,
  getAircraft,
  getTime,
  getFuel,
  getCost,
} = require("./controller.js");

app.use(express.json());
app.use(cors());

// Dev
app.post("/seed", seed);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
app.get("/js", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.js"));
});
app.get("/css", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/styles.css"));
});

app.get("/aircraft", getAircraft);
app.post("/time", getTime);
app.post("/fuel", getFuel);
app.post("/cost", getCost);

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`));
