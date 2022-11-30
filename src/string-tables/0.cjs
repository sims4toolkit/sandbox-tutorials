const { StringTableResource } = require("@s4tk/models");

// ==================================================
// Creating a String Table

// create a new, empty string table
const stbl = new StringTableResource();

// ==================================================
// Adding New Strings

// add the string "First", with key = FNV32 hash of "First"
stbl.addAndHash("First");

// add the string "Second", with key = FNV32 hash of "creatorName:string_Second"
stbl.addAndHash("Second", "creatorName:string_Second");

// add the string "Third", with key = 0x12345678
stbl.add(0x12345678, "Third");

// Challenge 1: Can you add the string "Fourth" with any key?

// TODO: Add the string "Fourth" here

// this test will verify that you added "Fourth" correctly
Sandbox.test("Challenge 1", stbl.entries[3]?.value === "Fourth");

// ==================================================
// Getting Strings

// get a string by its key
stbl.getByKey(0x3b83da79); // first entry

// get a string by its value
stbl.getByValue("Second"); // second entry

// get a string by its index
stbl.entries[2]; // third entry

// Challenge 2: Can you get the fourth entry?

let fourthEntry;

// TODO: set the value of `fourthEntry`

// this line will verify that you retrieved `fourthEntry` correctly
Sandbox.test("Challenge 2", fourthEntry?.value === "Fourth");

// ==================================================
// Editing Strings

// edit the first string's key
// TODO:

// edit a string's value
// TODO:

// ==================================================
// Deleting Strings

// TODO:
