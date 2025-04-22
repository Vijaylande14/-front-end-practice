const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const clearBtn = document.getElementById('clear');
const downloadBtn = document.getElementById('download');
const eraserBtn = document.getElementById('eraser');
const undoBtn = document.getElementById('undo');

let painting = false;
let eraserMode = false;
let drawColor = colorPicker.value;
let history = [];

function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  saveState();
}

function saveState() {
  history.push(canvas.toDataURL());
  if (history.length > 50) history.shift();
}

window.addEventListener('resize', () => {
  const temp = ctx.getImageData(0, 0, canvas.width, canvas.height);
  resizeCanvas();
  ctx.putImageData(temp, 0, 0);
});

resizeCanvas();

function getXY(e) {
  const rect = canvas.getBoundingClientRect();
  if (e.touches) {
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  } else {
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }
}

function startPosition(e) {
  e.preventDefault();
  painting = true;
  saveState();
  draw(e);
}

function endPosition() {
  painting = false;
  ctx.beginPath();
}

function draw(e) {
  if (!painting) return;

  const { x, y } = getXY(e);

  ctx.lineWidth = brushSize.value;
  ctx.lineCap = 'round';
  ctx.strokeStyle = eraserMode ? "#ffffff" : drawColor;

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

// Mouse events
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mouseout', endPosition); // Important!
canvas.addEventListener('mousemove', draw);

// Touch events (mobile)
canvas.addEventListener('touchstart', startPosition, { passive: false });
canvas.addEventListener('touchend', endPosition);
canvas.addEventListener('touchcancel', endPosition);
canvas.addEventListener('touchmove', draw, { passive: false });

// Prevent right-click context menu
canvas.addEventListener('contextmenu', e => e.preventDefault());

colorPicker.addEventListener('input', () => {
  drawColor = colorPicker.value;
  if (eraserMode) toggleEraser();
});

eraserBtn.addEventListener('click', toggleEraser);
function toggleEraser() {
  eraserMode = !eraserMode;
  eraserBtn.classList.toggle("eraser-active");
}

clearBtn.addEventListener('click', () => {
  saveState();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

undoBtn.addEventListener('click', () => {
  if (history.length > 1) {
    history.pop();
    const img = new Image();
    img.src = history[history.length - 1];
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }
});

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'drawing.png';
  link.href = canvas.toDataURL();
  link.click();
});
