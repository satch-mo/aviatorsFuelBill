This full-stack javscript app utilizes axios, express, cors, and sequelize.

MVP:
For a selected aircraft and given distance, the user will be able to:

-Calculate trip time based on the aircraft's avg cruise speed stored in the database.

-Calculate fuel consumption based on an average gallon/hour value.
    (the fuel feature will also specify which fuel type the aircraft uses)

-Calculate the cost of fuel burned on the trip.
    (also takes the necessary fuel type and price into consideration)

When loaded, the front end makes a get request to the server, retrieves all makes and models from the database, and populates the dropdown list with its response.

The user will select an aircraft, input a distance value, and click on an action. Each of these three actions will send post requests to the server, sequelize data from the database, and perform the calculations serverside before sending them back to the front end.





