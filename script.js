// Global variables
const time_el = document.querySelector(".watch .time");
const start_btn = document.getElementById("start_btn");
const stop_btn = document.getElementById("stop_btn");
const reset_btn = document.getElementById("reset_btn");
const lap_btn = document.getElementById("lap_btn");
const laps_parenet_div = document.getElementById("laps");

let interval = null;
let hrs = 0;
let mins = 0;
let secs = 0;
let milli = 0;


// Update the timer
function timer() {
    milli++;
    if (milli < 10) milli = "0" + milli;
    if(milli == 100){
        milli = 0;
        secs++;
        // Format our time
        hrs = Math.floor(secs / 3600);
        mins = Math.floor((secs - (hrs * 3600)) / 60);
        secs %= 60;
        
        if (secs < 10) secs = "0" + secs;
        if (mins < 10) mins = "0" + mins;
        if (hrs < 10) hrs = "0" + hrs;
        
    }
    // console.log(`${hrs} ${mins} ${secs}`);

    time_el.innerHTML = `${hrs}:${mins}:${secs}.<sub>${milli}</sub>`;
}

function start() {
    if (interval) {
        return;
    }
    interval = setInterval(timer, 10);
}

function stop() {
    clearInterval(interval);
    interval = null;
}

let isReset = false;

function reset() {
    stop();
    // console.log(`${hrs} ${mins} ${secs}`);
    hrs = 0;
    mins = 0;
    secs = 0;
    milli = 0;
    time_el.innerHTML = "00:00:00.<sub>00</sub>";
    isReset = true;
}

let lapCounter = 0;
function lapDiv(){
    lapCounter++;
    if (isReset){
        if (secs < 10) secs = "0" + secs;
        if (mins < 10) mins = "0" + mins;
        if (hrs < 10) hrs = "0" + hrs;
    }
    laps_parenet_div.innerHTML += `
    <div class="lap">
    <div class="innerLap">${lapCounter} 🏳️ ${hrs}:${mins}:${secs}.<sub><small>${milli}</small></sub></div>
    </div>
    `;
}


// Event listeners
start_btn.addEventListener("click", start);
stop_btn.addEventListener("click", stop);
reset_btn.addEventListener("click", reset);
lap_btn.addEventListener("click", lapDiv);