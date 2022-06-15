// require("dotenv").config();
// const { SERVER_PORT } = process.env;

const aircraftSelect = document.querySelector("#aircraft-select");
const distanceField = document.querySelector("#distance");
const aviatorForm = document.querySelector("#aviator");
const timeButton = document.querySelector("#time");
const fuelButton = document.querySelector("#fuel");
const costButton = document.querySelector("#cost");

function getAircraft() {
  axios.get(`http://localhost:5877/aircraft`).then((res) => {
    res.data.forEach((aircraft) => {
      const option = document.createElement("option");
      option.setAttribute("value", aircraft["craft_id"]);
      option.textContent = aircraft.make + " " + aircraft.model;
      // console.log(option.textContent);
      // console.log(aircraft.gph);
      aircraftSelect.appendChild(option);
    });
  });
}

function calculator(event) {
  event.preventDefault();
  console.log(event.target);
  console.log(distanceField.value);
  console.log(aircraftSelect.value);

  let tripObj = {
    aircraft: aircraftSelect.value,
    distance: distanceField.value,
  };

  if (event.target.textContent === "Time") {
    console.log("Time Hit!");
    axios.post("http://localhost:5877/time", tripObj); // then.catch
  } else if (event.target.textContent === "Fuel") {
    console.log("Fuel Hit!");
  } else if (event.target.textContent === "Cost") {
    console.log("Cost Hit!");
  }
}

// console.log(aviatorForm.value);

aviatorForm.addEventListener("submit", calculator);
timeButton.addEventListener("click", calculator);
fuelButton.addEventListener("click", calculator);
costButton.addEventListener("click", calculator);

getAircraft();
