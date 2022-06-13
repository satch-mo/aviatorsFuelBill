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
// post for /time
// post for /fuel
// post for /fuelcost

// Aircraft
app.get("/aircraft", getAircraft);

// Fuel Price

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`));
