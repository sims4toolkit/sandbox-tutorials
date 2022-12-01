Sandbox.output("This outputs one line");

Sandbox.output("And", "this", "outputs", "four");

// run the script, then set this to true and run it again
const somethingToTest = false;

Sandbox.test("Variable should be true", somethingToTest);
