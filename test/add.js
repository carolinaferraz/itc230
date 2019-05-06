/* eslint-disable no-undef */

let expect = require("chai").expect; 
let color = require("../lib/colors");

describe("color - add module", () => {
    it("adds new color", () => {
      const result = color.add("blue");
      expect(result).to.be.string;
    });
    
    // broken :(
    it("fails if color already exists", () => {
      const result = color.add("black");
      expect(result).to.throw(Error);
    });
});