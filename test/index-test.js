var expect = require("chai").expect;
// var book = require("../lib/colors");

const validadepwd = (pwd) => {
    return (pwd.toLowerCase() != pwd)
}

describe("password validation", () => {
 it("passes if mixed case", function() {
   var result = validadepwd("abcDef");
   expect(result).to.be.true;
});

it("fails if all lower case", function() {
    var result = validadepwd("abcDef");
    expect(result).to.be.false;

});

});