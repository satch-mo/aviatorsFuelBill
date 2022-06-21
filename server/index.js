require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

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
app.use(express.static("public"));

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

const port = process.env.PORT || 5877;
app.listen(port, () => console.log(`up on ${port}`));
