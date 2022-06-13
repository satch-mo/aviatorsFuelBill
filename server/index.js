require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { SERVER_PORT } = process.env;

const { seed, getAircraft } = require("./controller.js");

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

// Aircraft
app.get("/aircraft", getAircraft);

// Fuel Price

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`));
