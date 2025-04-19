let display = document.getElementById('display');

function append(value) {
  if (display.innerText === '0') {
    display.innerText = value;
  } else {
    display.innerText += value;
  }
}

function clearDisplay() {
  display.innerText = '0';
}

function calculate() {
  try {
    display.innerText = eval(display.innerText);
  } catch (e) {
    display.innerText = 'Error';
  }
}

// Dark mode toggle
document.getElementById('darkModeToggle').addEventListener('change', function () {
  document.body.classList.toggle('dark-mode');
});

// Gradient theme selector
document.getElementById('gradientSelector').addEventListener('change', function () {
  const value = this.value;
  switch (value) {
    case 'style1': // Sunset
      document.body.style.background = 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)';
      break;
    case 'style2': // Ocean
      document.body.style.background = 'linear-gradient(-45deg, #2193b0, #6dd5ed, #2193b0, #6dd5ed)';
      break;

    case 'style4': // Rainbow
      document.body.style.background = 'linear-gradient(-45deg, red, orange, yellow, green, blue, indigo, violet)';
      break;
  }
  document.body.style.backgroundSize = '400% 400%';
});
