const ROWS = 6;
const COLS = 7;
const board = [];
let currentPlayer = 1;

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    for (let row = 0; row < ROWS; row++) {
        board[row] = [];
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            gameBoard.appendChild(cell);
            board[row][col] = 0;
            cell.addEventListener('click', () => dropPiece(col));
        }
    }
}

function dropPiece(col) {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row][col] === 0) {
            board[row][col] = currentPlayer;
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            cell.textContent = currentPlayer === 1 ? 'X' : 'O'; 
            cell.classList.add(`player-${currentPlayer}`);
            if (checkWin(row, col)) {
                setTimeout(() => {
                    alert(`Player ${currentPlayer === 1 ? 'X' : 'O'} wins!`);
                    resetGame();
                }, 100);
                return;
            }
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            return;
        }
    }
}

function checkWin(row, col) {
    const directions = [
        [0, 1], 
        [1, 0], 
        [1, 1], 
        [-1, 1] 
    ];

    for (const [dx, dy] of directions) {
        let count = 1;
        for (const dir of [-1, 1]) {
            let r = row + dy * dir;
            let c = col + dx * dir;
            while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
                count++;
                r += dy * dir;
                c += dx * dir;
            }
        }
        if (count >= 4) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.remove('player-one', 'player-two');
        cell.textContent = ''; 
        cell.parentNode.removeChild(cell);
    });
    createBoard();
    currentPlayer = 1;
}

createBoard();