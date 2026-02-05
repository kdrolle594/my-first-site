        let board = ['', '', '', '', '', '', '', '', ''];
        let playerSymbol = '';
        let computerSymbol = '';
        let gameActive = false;

        function startGame(symbol) {
            playerSymbol = symbol;
            computerSymbol = symbol === 'X' ? 'O' : 'X';
            gameActive = true;
            document.getElementById('player-select').style.display = 'none';
            document.getElementById('game-board').style.display = 'block';
            document.getElementById('status').textContent = 'YOUR TURN';
            
            if (computerSymbol === 'X') {
                setTimeout(computerMove, 500);
            }
        }

        function makeMove(index) {
            if (!gameActive || board[index] !== '' || document.getElementById('status').textContent.includes('COMPUTER')) {
                return;
            }

            board[index] = playerSymbol;
            const cells = document.querySelectorAll('.cell');
            cells[index].textContent = playerSymbol;
            cells[index].classList.add('taken');

            if (checkWinner(playerSymbol)) {
                document.getElementById('status').textContent = 'YOU WIN!';
                gameActive = false;
                document.getElementById('reset').style.display = 'inline-block';
                return;
            }

            if (board.every(cell => cell !== '')) {
                document.getElementById('status').textContent = 'DRAW!';
                gameActive = false;
                document.getElementById('reset').style.display = 'inline-block';
                return;
            }

            document.getElementById('status').textContent = 'COMPUTER THINKING...';
            setTimeout(computerMove, 800);
        }

        function computerMove() {
            if (!gameActive) return;

            let move = getBestMove();
            board[move] = computerSymbol;
            const cells = document.querySelectorAll('.cell');
            cells[move].textContent = computerSymbol;
            cells[move].classList.add('taken');

            if (checkWinner(computerSymbol)) {
                document.getElementById('status').textContent = 'COMPUTER WINS!';
                gameActive = false;
                document.getElementById('reset').style.display = 'inline-block';
                return;
            }

            if (board.every(cell => cell !== '')) {
                document.getElementById('status').textContent = 'DRAW!';
                gameActive = false;
                document.getElementById('reset').style.display = 'inline-block';
                return;
            }

            document.getElementById('status').textContent = 'YOUR TURN';
        }

        function getBestMove() {
            // Try to win
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = computerSymbol;
                    if (checkWinner(computerSymbol)) {
                        board[i] = '';
                        return i;
                    }
                    board[i] = '';
                }
            }

            // Block player
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = playerSymbol;
                    if (checkWinner(playerSymbol)) {
                        board[i] = '';
                        return i;
                    }
                    board[i] = '';
                }
            }

            // Take center
            if (board[4] === '') return 4;

            // Take corner
            const corners = [0, 2, 6, 8];
            const availableCorners = corners.filter(i => board[i] === '');
            if (availableCorners.length > 0) {
                return availableCorners[Math.floor(Math.random() * availableCorners.length)];
            }

            // Take any available
            const available = board.map((cell, i) => cell === '' ? i : null).filter(i => i !== null);
            return available[Math.floor(Math.random() * available.length)];
        }

        function checkWinner(symbol) {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];

            return winPatterns.some(pattern => 
                pattern.every(index => board[index] === symbol)
            );
        }

        function resetGame() {
            board = ['', '', '', '', '', '', '', '', ''];
            gameActive = false;
            const cells = document.querySelectorAll('.cell');
            cells.forEach(cell => {
                cell.textContent = '';
                cell.classList.remove('taken');
            });
            document.getElementById('game-board').style.display = 'none';
            document.getElementById('player-select').style.display = 'block';
            document.getElementById('reset').style.display = 'none';
        }