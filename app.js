const chessText = "Play a game of chess against a friend or the computer. Features include move validation, check/checkmate detection, and an intuitive interface.";
const ticTacToeText = "Enjoy a classic game of Tic Tac Toe with a retro design. Challenge a friend or play against the computer in this simple yet fun game.";
const typingElement = document.getElementById("typing-text");
const Chess = document.getElementById("chess-button");
const TicTacToe = document.getElementById("tictactoe-button");
let index = 0;
const speed = 50; // Speed of typing in milliseconds
Chess.addEventListener("mouseover", () => {
    index = 0;
    typingElement.innerText = "";
    typeText(chessText);
})
TicTacToe.addEventListener("mouseover", () => {   
    index = 0;
    typingElement.innerText = "";
    typeText(ticTacToeText);
})
function typeText(text) {
    if (index < text.length) {
        typingElement.textContent += text.charAt(index);
        index++;
        setTimeout(() => typeText(text), speed);
    }
}