let isOn = false;

function toggleBulb() {
  const bulb = document.getElementById('bulb');
  if (isOn) {
    bulb.src = "https://www.w3schools.com/js/pic_bulboff.gif";
  } else {
    bulb.src = "https://www.w3schools.com/js/pic_bulbon.gif";
  }
  isOn = !isOn;
}
