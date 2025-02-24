document.addEventListener("DOMContentLoaded", function () {
    const gameBoard = document.getElementById("game-board");
    const statusText = document.getElementById("game-status");
    const restartButton = document.getElementById("restart-button");
    const easyModeButton = document.getElementById("easy-mode");
    const hardModeButton = document.getElementById("hard-mode");

    let boardState = ["", "", "", "", "", "", "", "", ""];
    let difficulty = "easy";

    function createBoard() {
        gameBoard.innerHTML = "";
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            cell.textContent = boardState[i];
            cell.addEventListener("click", () => playerMove(i));
            gameBoard.appendChild(cell);
        }
    }

    function playerMove(index) {
        if (boardState[index] !== "") return;

        fetch("http://localhost:8080/api/tictactoe/move", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ index, player: "X", difficulty })
        })
            .then(response => response.text())
            .then(result => {
                statusText.textContent = result === "" ? "Your turn!" : result;
                updateBoard();

                if (!result.includes("wins") && !result.includes("draw")) {
                    setTimeout(() => {
                        updateBoard();
                    }, 500);
                }
            });
    }


    function updateBoard() {
        fetch("http://localhost:8080/api/tictactoe/state")
            .then(response => response.json())
            .then(data => {
                boardState = data;
                createBoard();
            });
    }

    function startGame() {
        fetch("http://localhost:8080/api/tictactoe/reset")
            .then(response => response.text())
            .then(() => {
                boardState = ["", "", "", "", "", "", "", "", ""];
                createBoard();
                statusText.textContent = "Your turn!";
            });
    }

    function setDifficulty(mode) {
        difficulty = mode;

        easyModeButton.classList.remove("selected");
        hardModeButton.classList.remove("selected");

        if (mode === "easy") {
            easyModeButton.classList.add("selected");
        } else {
            hardModeButton.classList.add("selected");
        }

        startGame();
    }

    easyModeButton.addEventListener("click", () => setDifficulty("easy"));
    hardModeButton.addEventListener("click", () => setDifficulty("hard"));
    restartButton.addEventListener("click", startGame);

    startGame();
});
