const card = document.getElementById('card');
const img = card.querySelector('img');

img.addEventListener('mousemove', (e) => {
  let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
  let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
  card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

card.addEventListener('mouseleave', () => {
  card.style.transform = `rotateY(0deg) rotateX(0deg)`;
});
