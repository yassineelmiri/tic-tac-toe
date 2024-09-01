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

function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    } else {
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    }
}

function checkWin() {
    let winConditions = [
        [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19], [20, 21, 22, 23, 24],
        [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23], [4, 9, 14, 19, 24],
        [0, 6, 12, 18, 24], [4, 8, 12, 16, 20]
    ];

    for (let i = 0; i < winConditions.length; i++) {
        let [a, b, c, d, e] = winConditions[i];
        if (
            boxes[a].innerHTML &&
            boxes[a].innerHTML === boxes[b].innerHTML &&
            boxes[a].innerHTML === boxes[c].innerHTML &&
            boxes[a].innerHTML === boxes[d].innerHTML &&
            boxes[a].innerHTML === boxes[e].innerHTML
        ) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = turn + " wins";
            document.querySelector("#play-again").style.display = "inline";

            [a, b, c, d, e].forEach(index => {
                boxes[index].style.backgroundColor = "#08D9D6";
                boxes[index].style.color = "#000";
            });
        }
    }
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
