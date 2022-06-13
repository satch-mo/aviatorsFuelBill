// require("dotenv").config();
// const { SERVER_PORT } = process.env;

const aircraftSelect = document.querySelector("#aircraft-select");

function getAircraft() {
  axios.get(`http://localhost:5877/aircraft`).then((res) => {
    res.data.forEach((aircraft) => {
      const option = document.createElement("option");
      option.setAttribute("value", aircraft["craft_id"]);
      option.textContent = aircraft.make + " " + aircraft.model;
      console.log(option.textContent);
      aircraftSelect.appendChild(option);
    });
  });
}

getAircraft();
