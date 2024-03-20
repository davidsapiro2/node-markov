"use strict";

const { MarkovMachine } = require("./markov");


const textNoBranches = "The cat in the hat.";
const textWithBranches = "the cat cat in the hat";

describe("get chains method", function () {

  let machine;
  let machine2;

  beforeEach(function () {
    machine = new MarkovMachine(textNoBranches);
    machine2 = new MarkovMachine(textWithBranches);
  });

  test("get chains", function () {
    expect(machine.getChains()).toEqual(
      {
        "The": ["cat"],
        "cat": ["in"],
        "in": ["the"],
        "the": ["hat."],
        "hat.": [null],
      }
    );
  });

  test("get chains 2", function () {
    expect(machine2.getChains()).toEqual(
      {
        "the": ["cat", "hat"],
        "cat": ["cat", "in"],
        "in": ["the"],
        "hat": [null],
      }
    );
  });
});