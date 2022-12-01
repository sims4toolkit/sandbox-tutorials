const { StringTableResource } = require("@s4tk/models");

// ==================================================
// Reading a String Table Binary

// first, you need to get a buffer containing STBL data
// in the sandbox, use `Sandbox.import(filename)`
const buffer = await Sandbox.import("Sample.stbl");

// then, you can use the static `StringTableResource.from()`
// method to create a StringTableResource
const stbl = StringTableResource.from(buffer);

// just to confirm that the stbl is loaded, check its value
Sandbox.output(`First value: ${stbl.entries[0].value}`);

// ==================================================
// Writing a String Table Binary

// to get the buffer for a string table, use `getBuffer()`
const outputBuffer = stbl.getBuffer();

// once you have the buffer, you can use `Sandbox.download()`
// to save it to your computer
Sandbox.download("Sample.stbl", outputBuffer);
