const { StringTableResource } = require("@s4tk/models");
const { formatStringKey } = require("@s4tk/hashing/formatting");

const stbl = new StringTableResource();

stbl.addAndHash("Test");

Sandbox.output(formatStringKey(stbl.entries[0].key));
Sandbox.download("Test.stbl", stbl.getBuffer());
