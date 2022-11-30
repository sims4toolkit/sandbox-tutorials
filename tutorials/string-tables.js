const { StringTableResource } = require("@s4tk/models");

// ==================================================
// Creating string tables

// create a new, empty string table
const stbl = new StringTableResource();

// create a string table from a JSON object
const jsonStbl = new StringTableResource([
  {
    key: 0x12345678,
    value: "First",
  },
  {
    key: 0x87654321,
    value: "Second",
  },
]);

// create a string table from a buffer
const buffer = await Sandbox.import("Sample.stbl");
const bufferStbl = StringTableResource.from(buffer);

// `Sandbox.import()` is specific to this website. In a Node environment,
// you'd use `const buffer = fs.readFileSync("path/to/file");`

// ==================================================
// Editing string tables

// add the string "First", with key = FNV32 hash of "First"
stbl.addAndHash("First");

// add the string "Second", with key = FNV32 hash of "creatorName:string_Second"
stbl.addAndHash("Second", "creatorName:string_Second");

// add the string "Third", with key = 0x12345678
stbl.add(0x12345678, "Third");

// Challenge 1: Can you add the string "Fourth", with any key you want?

// TODO: delete strings

// Challenge 2: TODO: deletion

// ==================================================
// Using string tables

// you can get a specific entry by its key using the getByKey() method
const thirdEntry = stbl.getByKey(0x12345678);

// if you check the console, you'll see "Third"
Sandbox.output(`0x12345678: ${thirdEntry.value}`);

// you can get a list of all entries with the `entries` property
const entries = stbl.entries;

// once you have a list of entries, you can get entries by index
const firstEntry = entries[0];

// if you check the console, you'll see the first entry in `stbl`
Sandbox.output(`${firstEntry.key}: ${firstEntry.value}`);

// Challenge 3: Can you output the value of the first entry in bufferStbl?

// ==================================================
// Saving string tables

const stblBuffer = stbl.getBuffer();

Sandbox.download("TutorialStringTable.stbl", stblBuffer);

// `Sandbox.download()` is specific to this website. In a Node environment,
// you'd use `fs.writeFileSync("path/to/file", stblBuffer);`
