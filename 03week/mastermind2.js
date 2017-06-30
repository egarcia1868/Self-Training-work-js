'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = 'abcd';
let guess = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function printBoard() {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

// function generateSolution() {
//   for (let i = 0; i < 4; i++) {
//     const randomIndex = getRandomInt(0, letters.length);
//     solution += letters[randomIndex];
//   }
// }

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateHint(guess, solution) {
  let exact = 0;
  let kinda = 0;
  for (let i = 0; i < 4; i++) {
    if (guess[i] === solution[i]) {
      exact += 1;
    } else {
      for (let j = 0; j < 4; j++) {
        if (guess[i] === solution[j]) {
          kinda += kinda - exact;
        }
      }
    }
  }
  console.log('E: '+exact+'/K: '+kinda)
  console.log('guess: '+guess)
  console.log('solution: '+solution)
  console.log('guess 1: '+guess[0]+' 2: '+guess[1]+' 3: '+guess[2]+' 4: '+guess[3])
  console.log('solution 1: '+solution[0]+' 2: '+solution[1]+' 3: '+solution[2]+' 4: '+solution[3])
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
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

//  generateSolution();
  getPrompt();
}
