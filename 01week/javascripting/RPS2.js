'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var compHand = Math.random();
if (compHand < .34) {
  compHand = 'rock'
} else if (compHand > .66) {
  compHand = 'scissors'
} else {
  compHand = 'paper'
}

function rPS(myHand, compHand) {
  if (myHand !== 'rock' && myHand !== 'scissors' && myHand !== 'paper') {
    return 'That\'s not a valid choice, idiot.'
  }
}
