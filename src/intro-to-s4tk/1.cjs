const { Package, StringTableResource } = require("@s4tk/models");

/*
  NOTE: Don't feel like you have to memorize all of this - the point of this
  tutorial is to show you how similar two different models can be, thanks to the
  base classes they inherit from. You'll learn more about packages and string
  tables in their respective tutorials.
*/

// ==================================================
// Writable Model Methods

// if you have a buffer containing binary data, you can load it into its
// respective model with its `from()` method

const pkgBuffer = await Sandbox.import("Sample.package");
const pkg = Package.from(pkgBuffer);

const stblBuffer = await Sandbox.import("Sample.stbl");
const stbl = StringTableResource.from(stblBuffer);

// to get the buffer for a model, you can use its `getBuffer()` method

// the first 4 bytes of a binary package should be "DBPF"
Sandbox.output("Pkg: " + pkg.getBuffer().toString("utf-8", 0, 4));

// the first 4 bytes of a binary string table should be "STBL"
Sandbox.output("Stbl: " + stbl.getBuffer().toString("utf-8", 0, 4));

// ==================================================
// Mapped Model Methods

// Package and StringTableResource both inherit from MappedModel

// mapped models have a `size` property, which is the number of items contained
Sandbox.output(`Pkg size: ${pkg.size}`);
Sandbox.output(`Stbl size: ${stbl.size}`);

// you can add key/value pairs with `add()`, which returns the created entry
const resourceKey = { type: 0x220557da, group: 0, instance: 0x1234567890abcd };
const stblEntry = pkg.add(resourceKey, stbl);
const stringEntry = stbl.add(0x12345678, "New string!");

// and retrieve entries by their key
Sandbox.test("Pkg get", pkg.getByKey(resourceKey) === stblEntry);
Sandbox.test("Stbl get", stbl.getByKey(0x12345678) === stringEntry);

// you can get keys/values from entries
Sandbox.test("Stbl entry", stblEntry.value === stbl);
Sandbox.test("String entry", stringEntry.value === "New string!");

// to delete an entry, you should use its ID, NOT its key (read the footnote in
// the tutorial guide for more information about IDs vs. keys)
pkg.delete(stblEntry.id);
stbl.delete(stringEntry.id);

// MappedModels have a LOT of methods for getting and setting data - you'll
// learn more about these methods in the Package and StringTableResource
// tutorials, or by reading through the MappedModel documentation
