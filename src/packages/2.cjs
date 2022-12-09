const { Package } = require("@s4tk/models");
const { BinaryResourceType } = require("@s4tk/models/enums");
const { formatResourceKey } = require("@s4tk/hashing/formatting");

const buffer = await Sandbox.import("Sample.package");

// allEntries is a list of key/value pairs - there is no Package object
const allEntries = Package.extractResources(buffer);

Sandbox.output("Extract all:");
allEntries.forEach((entry) => {
  Sandbox.output(` | ${formatResourceKey(entry.key, "-")}`);
});

// this will extract just the string table(s), using a resource fileter
const stblsOnly = Package.extractResources(buffer, {
  resourceFilter: (type) => type === BinaryResourceType.StringTable,
});

Sandbox.output("\nExtract STBLs:");
stblsOnly.forEach((entry) => {
  Sandbox.output(` | ${formatResourceKey(entry.key, "-")}`);
});
