// you can import S4TK modules with `require()`
const { StringTableResource } = require("@s4tk/models");
const { formatStringKey } = require("@s4tk/hashing/formatting");

// import the STBL data, as you saw on the last page
const buffer = await Sandbox.import("Sample.stbl");

// now that you've imported StringTableResource, you can parse the buffer
const stbl = StringTableResource.from(buffer);

// this line gets the first entry in the string table
const entry = stbl.entries[0];

// see what the key/value of the entry are!
Sandbox.output(`Key: ${formatStringKey(entry.key)}`, `Value: ${entry.value}`);
