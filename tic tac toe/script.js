const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

function cellClicked() {
    const index = this.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    this.textContent = currentPlayer;
    this.classList.add(currentPlayer === "X" ? "blue" : "red");

    checkWinner();
    switchPlayer();
}

function switchPlayer() {
    if (!gameActive) return;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
    for (let condition of winConditions) {
        const [a, b, c] = condition;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;

            condition.forEach(i => cells[i].classList.add("win"));
            statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
            return;
        }
    }

    if (!board.includes("")) {
        statusText.textContent = "It's a Draw 😐";
        gameActive = false;
    }
}

function resetGame() {
    currentPlayer = "X";
    gameActive = true;
    board.fill("");

    cells.forEach(cell => {
        cell.textContent = "";
        cell.className = "cell";
    });

    statusText.textContent = `Player X's Turn`;
}

cells.forEach(cell => cell.addEventListener("click", cellClicked));
resetBtn.addEventListener("click", resetGame);
