const { StringTableResource } = require("@s4tk/models");

const stbl = new StringTableResource();
const buffer = await Sandbox.import("Sample.stbl");
const bufferStbl = StringTableResource.from(buffer);

// Challenge 1: Can you add the string "Fourth", with any key you want?

stbl.add(0x87654321, "Fourth");

// Challenge 2: TODO:

// TODO:

// Challenge 3: Can you output the value of the first entry in bufferStbl?

const entry = bufferStbl.entries[0];
Sandbox.output(entry.value);
