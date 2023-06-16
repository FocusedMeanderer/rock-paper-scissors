const moves = [ 'rock', 'paper', 'scissors' ];
/*
const playerSelection = moves[0];
const computerSelection = getComputerChoice();
*/

function getComputerChoice() {
  pick = Math.floor(((Math.random() * 100) + 1) % 3);
  return moves[pick];
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection == computerSelection) {
    console.log(`It's a draw! You both chose ${playerSelection}.`);
    return 0;
  }
  else if (
    playerSelection === 'rock' && computerSelection === 'scissors' ||
    playerSelection === 'paper' && computerSelection === 'rock' ||
    playerSelection === 'scissors' && computerSelection === 'paper'
  ) {
    console.log(`You win! ${playerSelection} beats ${computerSelection}!`);
    return 1;
  }
  else {
    console.log(`You lose! ${playerSelection} is beaten by ${computerSelection}!`);
    return 0;
  }
}

function getPlayerChoice() {
  let keepGoing = true;
  let userChoice;
  let message = "Pick your weapon";

  while (keepGoing) {
    userChoice = prompt(`${message}: ${moves.join(', ')}:`);

    if (userChoice === null) {
      return userChoice;
    }

    userChoice = userChoice.toLowerCase();

    if (userChoice === moves[0] || userChoice === moves[1] || userChoice == moves[2]) {
      keepGoing = false;
    }
    else {
      console.log("That's not quite right. Try again. Check your spelling.");
      message = "Let's try that again, pick your weapon"
    }
  }
  
  return userChoice;
}

function game() {
  console.log("Rock, Paper, Scissors... best of five");
  let wins = 0;
  
  for (let round = 0; round < 5; round++) {
    console.log(`Round ${round + 1}...`);

    let computerSelection = getComputerChoice();
    let playerSelection  = getPlayerChoice();

    if (playerSelection === null) {
      console.log("You have chosen to stop playing.");
      return;
    }

    wins += playRound(playerSelection, computerSelection);

    console.log(`${wins} win${wins>1?'s':''} in ${round+1} round${(round+1)>1?'s':''}.`);
  }
}