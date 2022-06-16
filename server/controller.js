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
        VALUES ('Cessna', '172',  8, 42, true, 122),
        ('Beechcraft', 'Bonanza', 15, 74, true, 175),
        ('Pilatus', 'PC-12', 55, 402, false, 268);
            
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
    // actual calculation happening
    console.log(req.body);
    const { aircraft, distance } = req.body; // destructuring from body so able to use. need cruise speed using craft_id (aircraft)

    sequelize
      .query(
        `
    SELECT cruise_speed FROM aircraft 
    WHERE craft_id = ${aircraft}
    `
      )
      .then((dbRes) => {
        // console.log(dbRes[0]);
        // console.log(dbRes[0][0].cruise_speed);

        let speed = dbRes[0][0].cruise_speed;

        let time = +distance / speed;
        let hours = Math.floor(time);
        let minutes = Math.floor((time % 1) * 60);

        let timeArr = [hours, minutes];

        for (i = 0; i < timeArr.length; i++) {
          if (timeArr[i] < 10) {
            timeArr[i] = `0${timeArr[i]}`;
          }
        }
        let timeStr = `${timeArr[0]}:${timeArr[1]}`; // could edit how i want it to appear
        console.log(timeStr);

        // console.log(time);
        // console.log(hours);
        // console.log(minutes);
        // console.log();
        // // console.log(+distance);

        // time in minutes = distance / cruise speed X 60
        // let time = +distance / dbRes[0].gph;
        // console.log(time);

        res.status(200).send(timeStr);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getFuel: (req, res) => {
    console.log(req.body);
  },
};
