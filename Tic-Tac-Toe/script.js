const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let board = Array(9).fill("");
let gameActive = true;
let winningPattern = [];

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    highlightWinningCells();
    statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
    gameActive = false;
  } else if (board.every(cell => cell !== "")) {
    statusText.textContent = "🤝 It's a Draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWinner() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      winningPattern = pattern;
      return true;
    }
    return false;
  });
}

function highlightWinningCells() {
  winningPattern.forEach(index => {
    document.querySelector(`.cell[data-index='${index}']`).classList.add("win");
  });
}

function restartGame() {
  board = Array(9).fill("");
  gameActive = true;
  currentPlayer = "X";
  winningPattern = [];
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("win");
  });
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);
