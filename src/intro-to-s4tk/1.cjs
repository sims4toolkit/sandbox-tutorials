const { Package, StringTableResource } = require("@s4tk/models");
const { StringTableLocale } = require("@s4tk/models/enums");
const { fnv64 } = require("@s4tk/hashing");

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

// this is just a function that gets the first 4 bytes of a buffer
const getFourBytes = (buffer) => buffer.toString("utf-8", 0, 4);

// the first 4 bytes of a binary package should be "DBPF"
Sandbox.output("Pkg: " + getFourBytes(pkg.getBuffer()));

// the first 4 bytes of a binary string table should be "STBL"
Sandbox.output("Stbl: " + getFourBytes(stbl.getBuffer()));

// ==================================================
// Mapped Model Methods

// Package and StringTableResource both inherit from MappedModel

// mapped models have a `size` property, which is the number of items contained
Sandbox.output(`Pkg size: ${pkg.size}`);
Sandbox.output(`Stbl size: ${stbl.size}`);

// don't worry about these 2 lines
const stblInstance = StringTableLocale.setHighByte(0, fnv64("Hash Me!"));
const resourceKey = { type: 0x220557da, group: 0, instance: stblInstance };

// you can add key/value pairs with `add()`, which returns the created entry
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

// MappedModels have a LOT of methods for getting and setting data - you can
// learn more by reading through the MappedModel documentation.

// The Package and StringTableResource tutorials will assume that you're
// at least somewhat familiar with MappedModel and their entries.
