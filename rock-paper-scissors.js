const MOVES = [ 'rock', 'paper', 'scissors' ];
const DRAW = -1;
const LOSS = 0;
const WIN = 1;
const weapons = document.querySelectorAll('.weapon');
let userWins = 0;
let userLosses = 0;
let draws = 0;
let rounds = 0;

function getComputerChoice() {
  let pick = Math.floor(Math.random() * 3); /* Gives 0 - 2 */
  return MOVES[pick];
}

function checkWinner(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return DRAW;
  }
  else if (
    playerSelection === 'rock' && computerSelection === 'scissors' ||
    playerSelection === 'paper' && computerSelection === 'rock' ||
    playerSelection === 'scissors' && computerSelection === 'paper'
  ) {
    return WIN;
  }
  else {
    return LOSS;
  }
}

weapons.forEach(weapon => {
  weapon.addEventListener('mouseenter', highlightWeapon);
  weapon.addEventListener('mouseleave', removeHighlight);
  weapon.addEventListener('click', playRound, { capture: true});
});

function highlightWeapon(e) {
  const rock = document.querySelector("img.rock");
  const paper = document.querySelector("img.paper");
  const scissors = document.querySelector("img.scissors");
  const rockLabel = document.querySelector("p.rock");
  const paperLabel = document.querySelector("p.paper");
  const scissorsLabel = document.querySelector("p.scissors");

  if (this.id === "rock") {
    rock.src = "img/Rock-sel.png";
    rockLabel.style.color = "#ee7c51";
  }
  else if (this.id === "paper") {
    paper.src = "img/Paper-sel.png";
    paperLabel.style.color = "#ee7c51";
  }
  else if (this.id === "scissors") {
    scissors.src = "img/Scissors-sel.png";
    scissorsLabel.style.color = "#ee7c51";
  }

  e.stopPropagation();
}

function removeHighlight(e) {
  const rock = document.querySelector("img.rock");
  const paper = document.querySelector("img.paper");
  const scissors = document.querySelector("img.scissors");
  const rockLabel = document.querySelector("p.rock");
  const paperLabel = document.querySelector("p.paper");
  const scissorsLabel = document.querySelector("p.scissors");

  if (this.id === "rock") {
    rock.src = "img/Rock-nbg.png";
    rockLabel.style.color = "#000";
  }
  else if (this.id === "paper") {
    paper.src = "img/Paper-nbg.png";
    paperLabel.style.color = "#000";
  }
  else if (this.id === "scissors") {
    scissors.src = "img/Scissors-nbg.png";
    scissorsLabel.style.color = "#000";
  }

  e.stopPropagation();
}

function playRound(e) {

  const computerChoice = getComputerChoice();
  const userChoice = e.currentTarget.id; /*
                               this.id === e.currentTarget
                               `e.currentTarget` points to the element where 
                               `e.target` is the innermost element that the user interacted with
                               `capture: true` was set because:
                                 - there's a chance the event will be triggered when user clicks
                                   on gaps between `img` and `p`
                                 - we want to handle the event on div.weapon first
                                   and not let it run on `img` and `p`
                               */

  const userChoiceCell = document.querySelector("td.userChoice");
  const computerChoiceCell = document.querySelector("td.computerChoice");
  const roundsCell = document.querySelector("td.thisRound");
  const resultsCell = document.querySelector("td.results");
  const winsCell = document.querySelector("td.wins");
  const lossesCell = document.querySelector("td.losses");
  const drawsCell = document.querySelector("td.draws");

  userChoiceCell.textContent = userChoice;
  computerChoiceCell.textContent = computerChoice;

  rounds++;
  roundsCell.textContent = rounds;

  switch (checkWinner(userChoice, computerChoice)) {
    case DRAW:
      draws++;
      resultsCell.textContent = "Draw";
      resultsCell.style.color = "blue";
      resultsCell.style.borderColor = "blue";
      drawsCell.textContent = draws;
      break;
    case LOSS:
      userLosses++;
      resultsCell.textContent = "You lose!";
      resultsCell.style.color = "red";
      resultsCell.style.borderColor = "red";
      lossesCell.textContent = userLosses;
      break;
    case WIN:
      userWins++;
      resultsCell.textContent = "You win!";
      resultsCell.style.color = "green";
      resultsCell.style.borderColor = "green";
      winsCell.textContent = userWins;
      break;
    default:
      console.log("Error: This should never happen!");
  }

  e.stopPropagation();
}