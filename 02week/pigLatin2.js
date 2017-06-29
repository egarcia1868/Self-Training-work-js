'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



function pigLatin(word) {
  word = word.toLowerCase();
  var lowestVowel = word.length;
  var i = 0;

  while (word[i] !== 'a' && word[i] !== 'e' && word[i] !== 'i' && word[i] !== 'o' &&
    word[i] !== 'u' && word[i] !== 'y' && i < word.length){
      i++;
      lowestVowel = i;
      console.log(i);
    }
  if (i === 0) {
    return word + 'yay';
  } else {
    return word.slice(i) + word.slice(0, i) + 'ay';
  }
}


  function getPrompt() {
    rl.question('word ', (answer) => {
      console.log(pigLatin(answer));
      getPrompt();
    });
  }

  // Tests

  if (typeof describe === 'function') {

    describe('#pigLatin()', () => {
      it('should translate a simple word', () => {
        assert.equal(pigLatin('car'), 'arcay');
        assert.equal(pigLatin('dog'), 'ogday');
      });
      it('should translate a complex word', () => {
        assert.equal(pigLatin('create'), 'eatecray');
        assert.equal(pigLatin('valley'), 'alleyvay');
      });
      it('should attach "yay" if word begins with vowel', () => {
        assert.equal(pigLatin('egg'), 'eggyay');
        assert.equal(pigLatin('emission'), 'emissionyay');
      });
      it('should auto lowercase word before translation', () => {
        assert.equal(pigLatin('HeLlO'), 'ellohay');
        assert.equal(pigLatin('RoCkEt'), 'ocketray');
      });
    });
  } else {

    getPrompt();

  }
