const NewYearCountdown = () =>{
    const present = new Date();
    const newYear = new Date(`January 1, ${present.getFullYear()+1} 00:00:00`);
    // const newYear = new Date()
   

    const timeDifference = newYear - present;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)); 
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days.toString().length === 1 ? '0' + days : days;
    document.getElementById('hours').innerText = hours.toString().length === 1 ? '0' + hours : hours;
    document.getElementById('minutes').innerText = minutes.toString().length === 1 ? '0' + minutes : minutes;
    document.getElementById('seconds').innerText = seconds.toString().length === 1 ? '0' + seconds : seconds;

    if(timeDifference <= 0){
        document.getElementById('countdown').innerText = 'Happy New Year!';
        document.getElementById('btn').innerText = 'Happy New Year!';
        document.getElementById('days').innerText = '00';
        document.getElementById('hours').innerText = '00';
        document.getElementById('minutes').innerText = '00';
        document.getElementById('seconds').innerText = '00';

    }

}

setInterval(NewYearCountdown, 1000);

const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameActive = true;
const boardState = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      return boardState[a];
    }
  }
  return null;
}

function isBoardFull() {
  return !boardState.includes(null);
}

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute("data-index");

  if (boardState[index] || !gameActive) {
    return;
  }

  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  const winner = checkWinner();
  if (winner) {
    message.textContent = `Player ${winner} wins!`;
    gameActive = false;
    return;
  }

  if (isBoardFull()) {
    message.textContent = `It's a tie!`;
    gameActive = false;
    return;
  }

  currentPlayer = "O";
  message.textContent = `Computer's turn`;
  setTimeout(computerMove, 500);
}

function computerMove() {
  if (!gameActive) return;
  const availableIndices = boardState
    .map((value, index) => (value === null ? index : null))
    .filter((index) => index !== null);

  const randomIndex =
    availableIndices[Math.floor(Math.random() * availableIndices.length)];
  boardState[randomIndex] = currentPlayer;
  const cell = cells[randomIndex];
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  const winner = checkWinner();
  if (winner) {
    message.textContent = `Player ${winner} wins!`;
    gameActive = false;
    return;
  }

  if (isBoardFull()) {
    message.textContent = `It's a tie!`;
    gameActive = false;
    return;
  }

  currentPlayer = "X";
  message.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
  boardState.fill(null);
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
  currentPlayer = "X";
  gameActive = true;
  message.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);

message.textContent = `Player ${currentPlayer}'s turn`;


