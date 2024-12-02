const rulesButton = document.getElementById('rules-button');
const rulesDescription = document.getElementById('rules-description');
const playerScoreSpanElement = document.getElementById('player-score');
const computerScoreSpanElement = document.getElementById('computer-score');
const roundResultMsg = document.getElementById('result-message');
const winnerMsgElement = document.getElementById('final-result');
const optionsContainer = document.querySelector('.option-container');
const resetButton = document.getElementById('reset-btn');
const rockBtn = document.getElementById('rock-btn');
const paperBtn = document.getElementById('paper-btn');
const scissorsBtn = document.getElementById('scissors-btn');

// Game state
let playerScore = 0;
let computerScore = 0;

// Rules
const choices = ['Rock', 'Paper', 'Scissors'];

// Show or hide the rules window
function toggleMenu() {
    if (rulesDescription) {
        rulesDescription.classList.toggle('show');
    }
}

// Get a random choice for the computer
function getRandomComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Determine if the player has won the round
function hasPlayerWonRound(playerChoice, computerChoice) {
    return (
        (playerChoice === 'Rock' && computerChoice === 'Scissors') ||
        (playerChoice === 'Scissors' && computerChoice === 'Paper') ||
        (playerChoice === 'Paper' && computerChoice === 'Rock')
    );
}

// Determine the round result
function getRoundResult(playerChoice) {
    const computerChoice = getRandomComputerChoice();

    if (hasPlayerWonRound(playerChoice, computerChoice)) {
        playerScore++;
        return `Player wins! ${playerChoice} beats ${computerChoice}`;
    } else if (computerChoice === playerChoice) {
        return `It's a tie! Both chose ${playerChoice}`;
    } else {
        computerScore++;
        return `Computer wins! ${computerChoice} beats ${playerChoice}`;
    }
}

// Display the winner of the game if someone reaches 3 points
function showWinner(playerChoice) {
    const resultMessage = getRoundResult(playerChoice);
    roundResultMsg.innerText = resultMessage;
    computerScoreSpanElement.innerText = computerScore;
    playerScoreSpanElement.innerText = playerScore;

    // If either player reaches 3 points, display the winner and show the reset button
    if (playerScore === 3 || computerScore === 3) {
        winnerMsgElement.innerText = `${playerScore === 3 ? "Player" : "Computer"} has won the game!`;
        resetButton.style.display = "block";
        optionsContainer.style.display = 'none';
    }
}

// Reset the game
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreSpanElement.innerText = playerScore;
    computerScoreSpanElement.innerText = computerScore;
    resetButton.style.display = 'none';
    optionsContainer.style.display = 'block';
    roundResultMsg.innerText = '';
    winnerMsgElement.innerText = '';
}

// Event listeners
rulesButton.addEventListener('click', toggleMenu);
rockBtn.addEventListener('click', () => showWinner('Rock'));
paperBtn.addEventListener('click', () => showWinner('Paper'));
scissorsBtn.addEventListener('click', () => showWinner('Scissors'));
resetButton.addEventListener('click', resetGame);
