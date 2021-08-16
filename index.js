window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const restart = document.querySelector('#restart');
    const result = document.querySelector('.message-result');
    const turn = document.querySelector('.message-turn');

    const winnerX = 'winnerX';
    const winnerO = 'winnerO';
    const drawGame = 'drawGame';

    let board = new Array(9).fill('');
    let isGameInProgress = true;
    let currentPlayer = 'X';

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCombo = winningCombinations[i]; // [0, 1, 2]
            const a = board[winCombo[0]];
            const b = board[winCombo[1]];
            const c = board[winCombo[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
                displayResults(currentPlayer === 'X' ? winnerX : winnerO);
                isGameInProgress = false;
                return;
            }

        if (!board.includes(''))
            displayResults(drawGame);
    }

    const displayResults = (type) => {
        switch(type){
            case winnerO:
                showConfetti();
                result.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case winnerX:
                showConfetti();
                result.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case drawGame:
                result.innerText = 'It\'s a draw';
        }
        turn.classList.add('display-none');
        result.classList.remove('display-none');
    };

    const isNotMarked = (tile) => {
        return !(tile.classList.contains('playerX') ||
            tile.classList.contains('playerO'));
    };

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    const switchPlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const makeMove = (tile, index) => {
        if(isNotMarked(tile) && isGameInProgress) {
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            switchPlayer();
            console.log('board:', board);
        }
    }
    
    const restartGame = () => {
        board = board.fill(''); //clear values
        isGameInProgress = true;
        turn.classList.remove('display-none');
        result.classList.add('display-none');

        if (currentPlayer === 'O') {
            switchPlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    const showConfetti = () => {
        window.confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => makeMove(tile, index));
    });

    restart.addEventListener('click', restartGame);
});