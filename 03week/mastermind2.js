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

  //  abcd          e=1/
  //  acdb          k=n/1/1/1

  //  abcd          e=1/1/1/1   1 /1 /1  /
  //  aabb          k=n/1/2/3   n /n /1  /2
  //                t=          []/[]/[1]/[1,1]
// i=3 j=1 k=0
  for (let i = 0; i < 4; i++) {
    if (guess[i] === solution[i]) {
      exact += 1;
    } else {
      for (let j = 0; j < 4; j++) {
        if (guess[i] === solution[j] && guess[j] !== solution[j]) {
          kinda += 1;
          temp.push(j);
          // console.log('temp length2: '+temp.length)
          for (let k = 0; k < temp.length-1; k++) {
            // console.log('solution[j]: '+solution[j])
            //           console.log('temp[k]: '+solution[temp[k]])
            if (solution[j] === solution[temp[k]]) {
              dupe += 1;
            }
          }
        }
      }
    }
    kinda = kinda - dupe
  }

console.log(exact+' - '+kinda)
// console.log(solution)
  // console.log('E: ' + exact + ' K: ' + kinda + ' T: ' + temp+' D: '+dupe)
  // console.log('guess: ' + guess)
  // console.log('solution: ' + solution)
  // console.log('guess 1: ' + guess[0] + ' 2: ' + guess[1] + ' 3: ' + guess[2] + ' 4: ' + guess[3])
  // console.log('solution 1: ' + solution[0] + ' 2: ' + solution[1] + ' 3: ' + solution[2] + ' 4: ' + solution[3])
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

   generateSolution();
  getPrompt();
}
