require("dotenv").config();
const Sequelize = require("sequelize");
const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  seed: (req, res) => {
    sequelize
      .query(
        `
        DROP TABLE IF EXISTS aircraft;
        DROP TABLE IF EXISTS fuel;


        CREATE TABLE aircraft (
        craft_id SERIAL PRIMARY KEY,
        make VARCHAR(40),
        model VARCHAR(40),
        gph FLOAT,
        tank_capacity FLOAT,
        is_piston BOOLEAN,
        cruise_speed FLOAT
        );

            
        INSERT INTO aircraft (make, model, gph, tank_capacity, is_piston, cruise_speed)
        VALUES ('Cessna', '172',  8, 42, true, 140),
        ('Beechcraft', 'Bonanza', 15, 74, true, 193),
        ('Cessna', '208 Caravan', 48, 332, false, 214);
            
        CREATE TABLE fuel (
        fuel_id SERIAL PRIMARY KEY,
        fuel_type VARCHAR(10) NOT NULL,
        fuel_price FLOAT NOT NULL);

        INSERT INTO fuel (fuel_type, fuel_price)
        VALUES ('100LL', 7.58 ),
         ('Jet A', 7.34);

    `
      )
      .then(() => {
        console.log("DB seeded!");
        res.sendStatus(200);
      })
      .catch((err) => console.log("error seeding db", err));
  },
  getAircraft: (req, res) => {
    sequelize
      .query(
        `
      SELECT * FROM aircraft
      `
      )
      .then((dbRes) => {
        // console.log(dbRes[0]);
        res.status(200).send(dbRes[0]);
      })
      .catch((err) => console.log(err));
  },

  getTime: (req, res) => {
    console.log(req.body);
    const {} = req.body;
  },
};
