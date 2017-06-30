'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Your code here
  // document.querySelectorAll('[data-cell]').forEach(cell) => {
  //   cell.innerText = 'x';
  // })
  let playerTurn = 'X';
  document.querySelectorAll('[data-cell]').forEach(cell => {
    cell.addEventListener('click', function() {
      this.innerText = playerTurn;
      if (checkForWin()) {
        document.querySelector('#announce-winner').innerText = `Player ${playerTurn} Wins!`;
      }
      playerTurn = (playerTurn === 'X') ? 'O' : 'X';
    });
  });

  function checkForWin() {
    const winningCells = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    return winningCells.some(combo => {
        return (combo.every((index) => {
              return document.querySelector(`[data-cell="${index}"]`).innerText === playerTurn;
            }
            // document.querySelector(`[data-cell="${combo[0]}"]`).innerText === playerTurn &&
            // document.querySelector(`[data-cell="${combo[1]}"]`).innerText === playerTurn &&
            // document.querySelector(`[data-cell="${combo[2]}"]`).innerText === playerTurn
            //use higher order function to change these three into one looping process
          ) {
            return true;
          }
        });
    }
  });)
