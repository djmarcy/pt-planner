// Variables
let timeBlock = document.getElementById("currentDay");
let time = null;
let currentTime = moment().format("H");
let hour = document.querySelectorAll("[data-time]");
let target = null;
let newTarget = null;
let newEvent = null;
let clearBtn = document.getElementById("clear-button");

// MomentJS & setInterval to ensure accurate timer
// Display current time on page load or function updateTime refresh
timeBlock.textContent = time;

// Grab time on page load, and ensure after every setInterval iteration the time is re-pulled from moment JS and properly updated
function updateTime() {
  time = moment().format("MMMM Do YYYY, h:mm:ss A");
  timeBlock.textContent = time;
}

// Controls interval at which clock updates; calling updateTime on pageload ensures the time displays properly. Leaving it off results in a 1s delay between pageload and clock appearing.
updateTime();
setInterval(updateTime, 1000);

// Conditional formatting to make rows in planner glow red for times already past, grey for the current hour, and green for times later in the day
for (i = 0; i < hour.length; i++) {
  let scheduledTime = parseInt(hour[i].dataset.time);

  if (currentTime > scheduledTime) {
    hour[i].classList.add("past");
  } else if (currentTime < scheduledTime) {
    hour[i].classList.add("future");
  } else {
    hour[i].classList.add("present");
  }
}

// Track which input is being saved, stops function from initiating if anything but the save button is pressed
function clickListen(e) {
  // Ignores anything without an ID, or anything with ID that includes the string "input", which is how I differentiated my save button IDs and input IDs
  if (e.target.id == "" || e.target.id.includes("input")) {
    return;
  } else {
    target = e.target.id;
    inputValue = document.getElementById("input" + target).value;
  }

  storeInfo(target, inputValue);
}

function storeInfo(target, inputValue) {
  localStorage.setItem(target, JSON.stringify(inputValue));
}

// Retrieve saved data
function getInfo() {
  //
  for (i = 9; i < 18; i++) {
    newEvent = localStorage.getItem(i);
    document.getElementById("input" + i).value = JSON.parse(newEvent);
  }
}

getInfo();

function clearLocal() {
  localStorage.clear;
}
// Event listeners ensuring that clicks are properly registered so events are saved to their correct location
document.addEventListener("click", clickListen);
clearBtn.addEventListener("click", clearLocal);
