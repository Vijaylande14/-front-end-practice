let timer;
let isRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;

const startStopButton = document.getElementById('start-stop-btn');
const resetButton = document.getElementById('reset-btn');
const stopButton = document.getElementById('stop-btn');
const timeDisplay = document.getElementById('time-display');

// Format time to ensure two digits
function formatTime(unit) {
  return unit < 10 ? '0' + unit : unit;
}

// Update time display
function updateTimeDisplay() {
  timeDisplay.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

// Start/Stop button functionality
startStopButton.addEventListener('click', () => {
  if (isRunning) {
    clearInterval(timer);
    startStopButton.textContent = 'Start';
    stopButton.disabled = true;
  } else {
    timer = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
      updateTimeDisplay();
    }, 1000);
    startStopButton.textContent = 'Pause';
    stopButton.disabled = false;
  }
  isRunning = !isRunning;
  resetButton.disabled = false;
});

// Stop button functionality
stopButton.addEventListener('click', () => {
  clearInterval(timer);
  startStopButton.textContent = 'Start';
  isRunning = false;
  stopButton.disabled = true;
});

// Reset button functionality
resetButton.addEventListener('click', () => {
  clearInterval(timer);
  isRunning = false;
  seconds = 0;
  minutes = 0;
  hours = 0;
  updateTimeDisplay();
  startStopButton.textContent = 'Start';
  resetButton.disabled = true;
  stopButton.disabled = true;
});
