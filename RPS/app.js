const startGameBtn = document.getElementById('start-game-btn');
const SELECTION_ROCK = 'ROCK';
const SELECTION_PAPER = 'PAPER';
const SELECTION_SCISSORS = 'SCISSORS';
const DEFOULT_USER_CHOICE = SELECTION_ROCK;
const RESULT_DROW = 'DRAW';
const RESULT_PLAYER_WINS = 'U WIN!';
const RESULT_COMPUTER_WINS = 'COMPUTER WINS!';

let gameIsRunning = false;

const getPlayerChoice = () => {
    const selection = prompt(`${SELECTION_ROCK}, ${SELECTION_PAPER} or ${SELECTION_SCISSORS} ? `, '').toUpperCase();
    if (selection !== SELECTION_ROCK &&
        selection !== SELECTION_PAPER &&
        selection !== SELECTION_SCISSORS) {
        alert(`Invalid choice! We choice ${DEFOULT_USER_CHOICE} for u!`)
        return; //DEFOULT_USER_CHOICE;
    }
    return selection;
};

const getComputerChoice =  () => {
    const randomValue = Math.random();
    if (randomValue < 0.34) {
        return SELECTION_ROCK;
    } else  if(randomValue < 0.67){
        return SELECTION_PAPER;
    }  else {
        return SELECTION_SCISSORS;
    }
};

const getWinner = (cChoice, pChoice = DEFOULT_USER_CHOICE) => cChoice === pChoice ? RESULT_DROW : (pChoice === SELECTION_ROCK && cChoice === SELECTION_SCISSORS ||
    pChoice === SELECTION_SCISSORS && cChoice === SELECTION_PAPER ||pChoice === SELECTION_PAPER && cChoice === SELECTION_ROCK) ? RESULT_PLAYER_WINS : RESULT_COMPUTER_WINS;
    // if (cChoice === pChoice) {
    //     return RESULT_DROW;
    // } else if (
    //     pChoice === SELECTION_ROCK && cChoice === SELECTION_SCISSORS ||
    //     pChoice === SELECTION_SCISSORS && cChoice === SELECTION_PAPER ||
    //     pChoice === SELECTION_PAPER && cChoice === SELECTION_ROCK
    // ) {
    //     return RESULT_PLAYER_WINS;
    // } else {
    //     return RESULT_COMPUTER_WINS;
    //     }

startGameBtn.addEventListener('click',  () => {
    if (gameIsRunning) {
    return;
    }
    gameIsRunning = true;
    console.log('Game is starting...')
    const playerChoice = getPlayerChoice();
    const computerChoice = getComputerChoice();
    let winner;
    if (playerChoice) {
    winner = getWinner(computerChoice, playerChoice);
    } else {
        winner = getWinner(computerChoice);
    }
    let message = `You picked ${playerChoice? playerChoice: DEFOULT_USER_CHOICE}, computer picked ${computerChoice} therefore u had a `
    if (winner === RESULT_DROW) {
        message +=  'had a draw.'; 
    } else if (winner === RESULT_PLAYER_WINS) {
         message +=  'won.';
    } else {
         message +='lost.';
    }
    alert(message);
    gameIsRunning = false;
});

// Not related to game

// const sumUp = (resultHandler, ...numbers) => {

//     const validateNumber = (number) => {
//         return isNaN(number) ? 0 : number;
//     };
//     let sum = 0;
//     for (const num of numbers) {
//         sum += validateNumber(num)
//     }
//     resultHandler(sum);
// };


// const subtractUp = function (...numbers) {
//     let subtr = 0;
//     for (const num of numbers) {
//         subtr -= num
//     } return subtr
// }

// const showResult = (result) => {
//     alert('result is:' + result)
// };
// console.log(sumUp(showResult, 2, 3, 4, 5, 6, 7, 8, 9, 2));
// console.log (subtractUp(showResult,2,3,4,5,6,7,2,5,2,4,4,4,0,3,4,3))