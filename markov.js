"use strict";
/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    let chains = {};

    for (let [index, word] of this.words.entries()) {
      let nextWord = this.words[index + 1] || null;

      if (chains[word]) {
        chains[word].push(nextWord);
      }
      else {
        chains[word] = [];
        chains[word].push(nextWord);
      }
    }

    return chains;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice.
   *
   * - start at the first word in the input text
   * - find a random word from the following-words of that
   * - repeat until reaching the terminal null
   * */

  getText() {
    /* Returns a random number between 0 and input length */
    function _getRandomIndex(length) {
      return Math.floor(Math.random() * (length));
    };

    let resultText = [];

    let word = this.words[0];

    while (word !== null) {

      resultText.push(word);

      let index = _getRandomIndex(this.chains[word].length);

      word = this.chains[word][index];
    }

    return resultText.join(' ');
  }
}

module.exports = {
  MarkovMachine,
};
