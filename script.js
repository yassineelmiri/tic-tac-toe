let boxes = [];
let turn = "X";
let isGameOver = false;
let roundsPlayed = 0;
const maxRounds = 5;
const gridSize = 20;

document.querySelector("#reset-game").addEventListener("click", resetGame);
document.querySelector("#start-game").addEventListener("click", startGame);
document.querySelector("#play-again").addEventListener("click", resetBoard);
window.onload = init;


function init() {
    loadScores();
    loadGameState();
    loadHistory();
}

function startGame() {
    const playerXName = getPlayerName("#playerXName", "Player X");
    const playerOName = getPlayerName("#playerOName", "Player O");

    localStorage.setItem('playerXName', playerXName);
    localStorage.setItem('playerOName', playerOName);

    updateDisplayName("#playerXDisplayName", playerXName);
    updateDisplayName("#playerODisplayName", playerOName);

    toggleVisibility("#player-form", "#game-container");
    createGrid();
    loadScores();
    loadGameState();
}

function createGrid() {
    const board = document.querySelector("#game-board");
    board.innerHTML = '';
    boxes = [];

    for (let i = 0; i < gridSize * gridSize; i++) {
        const box = document.createElement("div");
        box.className = "box";
        box.dataset.index = i;
        box.addEventListener("click", handleBoxClick);
        boxes.push(box);
        board.appendChild(box);
    }
}

function handleBoxClick(event) {
    const box = event.target;
    if (!isGameOver && box.innerHTML === "") {
        box.innerHTML = turn;
        saveGameState();
        checkWin();
        checkDraw();
        changeTurn();
    }
}


function changeTurn() {
    turn = turn === "X" ? "O" : "X";
    document.querySelector(".bg").style.left = turn === "X" ? "0" : "85px";
    saveGameState();
}

function markWin() {
    document.querySelector("#results").innerText = `${turn} wins!`;
    updateScore();
    isGameOver = true;
    document.querySelector("#play-again").style.display = "block";
    saveGameState();
}

function checkWin() {
    const winLength = 5;

    if (checkDirection(winLength, checkHorizontal) || checkDirection(winLength, checkVertical) ||
        checkDirection(winLength, checkDiagonalRight) || checkDirection(winLength, checkDiagonalLeft)) {
        markWin();
    }
}

function checkDirection(winLength, checkFn) {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize - winLength + 1; col++) {
            if (checkFn(row, col, winLength)) return true;
        }
    }
    return false;
}


function checkHorizontal(row, col, winLength) {
    return Array.from({ length: winLength }, (_, i) => boxes[row * gridSize + col + i])
        .every(box => box.innerHTML === turn);
}

function checkVertical(row, col, winLength) {
    return Array.from({ length: winLength }, (_, i) => boxes[(row + i) * gridSize + col])
        .every(box => box.innerHTML === turn);
}

function checkDiagonalRight(row, col, winLength) {
    return Array.from({ length: winLength }, (_, i) => boxes[(row + i) * gridSize + col + i])
        .every(box => box.innerHTML === turn);
}

function checkDiagonalLeft(row, col, winLength) {
    return Array.from({ length: winLength }, (_, i) => boxes[(row - i) * gridSize + col + i])
        .every(box => box.innerHTML === turn);
}

function checkDraw() {
    if (!isGameOver) {
        let isDraw = true;
        boxes.forEach(e => {
            if (e.innerHTML === "") isDraw = false;
        });

        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#play-again").style.display = "inline";
        }
    }
}

document.querySelector("#play-again").addEventListener("click", () => {
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
    });
});
