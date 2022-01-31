// Variables
let timeBlock = document.getElementById("currentDay");
let time = null;
let currentTime = moment().format("H")
let hour = document.querySelectorAll("[data-time]")

// MomentJS & setInterval to ensure accurate timer
// Display current time on page load or function updateTime refresh
timeBlock.textContent = time;
console.log(moment().format("h"));

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

  let scheduledTime = parseInt(hour[i].dataset.time)

  if (currentTime > scheduledTime) {
    hour[i].classList.add("past")
  } else if (currentTime < scheduledTime) {
    hour[i].classList.add("future")
  } else {
    hour[i].classList.add("present")
  }
}

// Local storage set/retrieval for events planned for the day

// Event listeners ensuring that clicks are properly registered so events are saved to their correct location
