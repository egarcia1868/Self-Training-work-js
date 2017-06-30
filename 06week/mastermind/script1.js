'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Your code here

  const board = [];
  let solution = '';
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

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
    // your code here
    let numSuper = 0;
    let numCorrect = 0;
    let splSolution = solution.split('');
    let splGuess = guess.split('');

    for (let i = 0; i < 4; i++) {
      if (splSolution[i] === splGuess[i]) {
        numSuper++;
      }
      if (splSolution.includes(splGuess[i])) {
        numCorrect++;
      }
    }
    return `${numSuper}-${numCorrect-numSuper}`;
  }

  // function generateSolution() {
  //   for (let i = 0; i < 4; i++) {
  //     const randomIndex = getRandomInt(0, letters.length);
  //     solution += letters[randomIndex];
  //   }
  //   console.log(solution)
  // }

});
