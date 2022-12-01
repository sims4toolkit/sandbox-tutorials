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

// ==================================================
// Getting Strings

// get a string by its key
const first = stbl.getByKey(0x3b83da79); // first entry
Sandbox.output(`First value: "${first.value}"`);

// get a string by its value
const second = stbl.getByValue("Second"); // second entry
Sandbox.output(`Second value: "${second.value}"`);

// get a string by its index (remember, indices start at 0!)
const third = stbl.entries[2]; // third entry
Sandbox.output(`Third value: "${third.value}"`);

// ==================================================
// Editing Strings

Sandbox.output(`Before edit: ${first.key} = "${first.value}"`);

// edit the first string's key
first.key = 12345;

// edit the first string's value
first.value = "New first!";

Sandbox.output(`After edit: ${first.key} = "${first.value}"`);

// ==================================================
// Deleting Strings

Sandbox.output(`Size before deleting: ${stbl.size}`);

// delete the first entry by its key
stbl.deleteByKey(12345);

// find an entry by its value, then delete by its ID
const toDelete = stbl.getByValue("Second");
stbl.delete(toDelete.id);

Sandbox.output(`Size after deleting: ${stbl.size}`);
