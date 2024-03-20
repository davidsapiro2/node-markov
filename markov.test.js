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

describe("get text method", function () {

  test("no branches", function () {
    const machine = new MarkovMachine("The cat in the hat.");
    expect(machine.getText()).toEqual("The cat in the hat.");
  });

  test("with branches", function () {
    const machine = new MarkovMachine("The cat cat in in the the hat hat.");
    expect(machine.getText()).toEqual(expect.any(String));
    expect(machine.getText()).toContain("The cat");
    expect(machine.getText()).toContain("hat.");
  });
});