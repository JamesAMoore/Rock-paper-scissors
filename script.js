const scorePlayer = document.querySelector(".player-score");
const scoreComputer = document.querySelector(".computer-score");
const playerChoice = document.querySelector('.player-selection')
const computerChoice = document.querySelector('.computer-selection')
const message = document.querySelector('.message')
const playAgain = document.querySelector('.button-container');
let playerScore = 0;
let computerScore = 0;
const buttons = Array.from(document.querySelectorAll(".choice"));
const playAgainBtn = document.createElement('button');

function startGame() {
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const playerSelection = button.dataset.image;
        handlePlayerChoice(playerSelection);
      });
    });
  
}
  
  function getComputerChoice() {
    let numberDecider = Math.floor(Math.random() * 100) + 1;
  
    if (numberDecider % 3 === 0) {
      return "Rock";
    } else if (numberDecider % 3 === 1) {
      return "Paper";
    } else {
      return "Scissors";
    }
  }
  
  function playRound(computerSelection, playerSelection) {
    if (playerSelection === computerSelection) {
      return "Tie";
    } else if (
      (playerSelection === "rock" && computerSelection === "scissors") ||
      (playerSelection === "paper" && computerSelection === "rock") ||
      (playerSelection === "scissors" && computerSelection === "paper")
    ) {
      playerScore += 1;
  
      return `Round Won ${playerSelection} beats ${computerSelection} `;
    } else {
      computerScore += 1;
      return `Round Lost ${computerSelection} beats ${playerSelection} `;
    }
  }
  
  function handlePlayerChoice(playerSelection) {
    const computerSelection = getComputerChoice().toLowerCase();
    const result = playRound(computerSelection, playerSelection);
    scorePlayer.textContent = playerScore;
    scoreComputer.textContent = computerScore;
    playerChoice.appendChild(addChoices(playerSelection.toUpperCase()));
    computerChoice.appendChild(addChoices(computerSelection.toUpperCase()));
    message.textContent = result;
    
    
    if (playerScore === 5 && computerScore < 5) {
        playAgainBtn.textContent = "Play Again?";
        playAgain.appendChild(playAgainBtn);
        playAgainBtn.classList.add('play-again');
        message.textContent = 'Congratulations! You Won!';
    } else if (playerScore < 5 && computerScore === 5 ) {
        playAgainBtn.textContent = "Play Again?";
        playAgain.appendChild(playAgainBtn);
        playAgainBtn.classList.add('play-again');
        message.textContent = 'Game Over, You Lost!'
    }
  
    if (playerScore === 5 || computerScore === 5) {
        buttons.forEach((button) =>
          button.removeEventListener("click", handleButtonClick)
        );
      }

    
  }

  function addChoices(choice) {
    const paragraph = document.createElement('p');
    paragraph.textContent = choice;

    return paragraph;
  }
  
  function handleButtonClick(e) {
    const playerSelection = e.target.dataset.image;
    handlePlayerChoice(playerSelection);
  }
  
  buttons.forEach((button) => {
    button.addEventListener("click", handleButtonClick);
  });

  playAgainBtn.addEventListener('click', () => {
    location.reload();
  });