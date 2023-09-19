const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart-btn');

let currentPlayer = 'X';
let isGameActive = true;
let moves = 0;
let boardState = ['', '', '', '', '', '', '', '', ''];

// Check for a win or draw after each move
function checkResult() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            isGameActive = false;
            highlightWinCells(pattern);
            message.textContent = `Player ${boardState[a]} wins!`;
            playCelebration();
            return;
        }
    }

    if (moves === 9) {
        isGameActive = false;
        message.textContent = "It's a draw!";
    } else if (isGameActive) { // Only update the message if the game is still active
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Handle a cell click event
function handleCellClick(index) {
    if (!isGameActive || boardState[index] !== '') return;

    boardState[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].setAttribute('data-cell', currentPlayer);
    cells[index].classList.add('cell-clicked'); // Add animation class for cell click
    moves++;
    checkResult();
}

// Highlight the winning cells
function highlightWinCells(pattern) {
    for (const index of pattern) {
        cells[index].classList.add('win-cell'); // Add animation class for winning cells
    }
}


function playCelebration() {

    const firecracker = document.createElement('div');
    firecracker.classList.add('firecracker');
    board.appendChild(firecracker);
    print
    console.log('congo');

    setTimeout(() => {
        firecracker.remove();
    }, 3000);
}



// Reset the game
function restartGame() {
    isGameActive = true;
    moves = 0;
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    message.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.setAttribute('data-cell', '');
        cell.classList.remove('cell-clicked', 'win-cell'); // Remove animation classes
    });
}

// Add event listeners
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

restartButton.addEventListener('click', restartGame);

// Start the game
restartGame();
