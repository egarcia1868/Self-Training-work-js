'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let guess = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function printBoard() {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

function generateSolution() {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateHint(guess, solution) {
  let exact = 0;
  let kinda = 0;
  let temp = [];
  let dupe = 0;

  for (let i = 0; i < 4; i++) {
    // This first detects if there is an exact match.  If not it continues
    if (guess[i] === solution[i]) {
      exact += 1;
    } else {
      for (let j = 0; j < 4; j++) {
    // This detects if there are any correct guesses in the wrong spot
        if (guess[i] === solution[j] && guess[j] !== solution[j]) {
          kinda += 1;
          temp.push(j); // This pushes to an array to later be used to make sure the
// hint doesn't display more 'kinda' correct answers than necessary. (e.g. - guessing
// aabb when the answer is abcd will return a 1-1 rather than 1-3)
          for (let k = 0; k < temp.length-1; k++) {
            // This keeps track of duplicate marks to be subtracted from the score later
            if (solution[j] === solution[temp[k]]) {
              dupe += 1;
            }
          }
        }
      }
    }
    kinda = kinda - dupe
  }
  board.push(guess+' '+exact+'-'+kinda)
}

function mastermind(guess) {
  if (solution !== guess) {
    generateHint(guess, solution);
  } else {
    return 'You guessed it!';
  }
}


function getPrompt() {
  rl.question('guess: ', (guess) => {
    console.log(mastermind(guess));
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      solution = 'abcd';
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abcd', 'abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('abcd', 'aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}
