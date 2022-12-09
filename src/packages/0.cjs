const { fnv64 } = require("@s4tk/hashing");
const { formatResourceKey } = require("@s4tk/hashing/formatting");
const { Package, StringTableResource } = require("@s4tk/models");
const { BinaryResourceType, StringTableLocale } = require("@s4tk/models/enums");

// You don't need to do this, it's just for conciseness later
const { setHighByte, English, Italian } = StringTableLocale;

// ==================================================
// Creating a Package

// Create a new, empty package
const pkg = new Package();

// ==================================================
// Adding Entries

// First, you need to make your keys - we're going to add two string tables,
// one in english, and one in italian, so let's make keys for those

// Hash something to get an instance base for the string tables
const stblInstanceBase = fnv64("CreatorName_ModName:StringTable_1");

// Remember, there are several enums available to help with creating resource
// keys, like BinaryResourceType and StringTableLocale (setHighByte, English,
// and Italian all come from StringTableLocale -- check the imports!)

const englishResourceKey = {
  type: BinaryResourceType.StringTable,
  group: 0x80000000,
  instance: setHighByte(English, stblInstanceBase),
};

const italianResourceKey = {
  type: BinaryResourceType.StringTable,
  group: 0x80000000,
  instance: setHighByte(Italian, stblInstanceBase),
};

// This tutorial supplies two string tables, so let's load those

const englishStbl = StringTableResource.from(
  await Sandbox.import("English.stbl")
);

const italianStbl = StringTableResource.from(
  await Sandbox.import("Italian.stbl")
);

// Now that we have resources and their keys, we can use add()
Sandbox.output(`Size before adding 2 stbls: ${pkg.size}`);
pkg.add(englishResourceKey, englishStbl);
pkg.add(italianResourceKey, italianStbl);
Sandbox.output(`Size after adding 2 stbls: ${pkg.size}\n`);

// ==================================================
// Getting Entries

// This is a helper to make things more readable, you'll see it used in a bit
function getFirstString(resourceEntry) {
  // Remember, entries are key/value pairs - to get the actual string table,
  // you need to use the `value` property
  const stbl = resourceEntry.value;

  // A string table is also a mapped model, so it also has a list of entries,
  // but their key/value pairs are numbers and strings
  const firstStringEntry = stbl.entries[0];
  return firstStringEntry.value;
}

// Get the english STBL entry by its key
const englishEntry = pkg.getByKey(englishResourceKey);
Sandbox.output(`English value: ${getFirstString(englishEntry)}`);

// Get the italian STBL entry by its index (remember, indicies start at 0!)
const italianEntry = pkg.entries[1];
Sandbox.output(`Italian string: ${getFirstString(italianEntry)}`);

// It's also possible to get an entry by its value, but this is inefficient
// and usually pointless for packages
Sandbox.test(
  "Get English STBL by value",
  pkg.getByValue(englishStbl) === englishEntry
);

Sandbox.output(""); // don't mind me, just putting a newline :)

// ==================================================
// Editing Entries

// You can edit an existing key
Sandbox.output(`EN key before: ${formatResourceKey(englishEntry.key, "-")}`);
englishEntry.key.group = 0;
Sandbox.output(`EN key after: ${formatResourceKey(englishEntry.key, "-")}`);

// You can even replace entire keys
Sandbox.output(`IT key before: ${formatResourceKey(italianEntry.key, "-")}`);
italianEntry.key = {
  type: BinaryResourceType.StringTable,
  group: 0,
  instance: italianEntry.key.instance,
};
Sandbox.output(`IT key after: ${formatResourceKey(italianEntry.key, "-")}\n`);

// You can edit an existing resource (`resource` is an alias for `value`, this
// is exactly the same as using englishEntry.value.size)
Sandbox.output(`Stbl size before edit: ${englishEntry.resource.size}`);
englishEntry.resource.addAndHash("Some new string");
Sandbox.output(`Stbl size after edit: ${englishEntry.resource.size}\n`);

// You can also set `value`/`resource` to a whole new object, but if you find
// yourself doing that, you're probably doing something wrong (most of the time,
// there is simply no need to replace the entire resource)

// ==================================================
// Deleting Entries

// Italians have taken over the planet, and English is now extinct. Let's delete
// the English string table, since no one needs it anymore.

Sandbox.output(`Size before deleting EN: ${pkg.size}`);
pkg.delete(englishEntry.id);
Sandbox.output(`Size after deleting EN: ${pkg.size}`);

// Humans are now extinct. Idk how, they just are. Anyways, there's no need for
// the Italian STBL now, so let's delete it too.

// Ideally, you should always delete entries by their ID, but you're allowed to
// delete them by their key if you want.

Sandbox.output(`Size before deleting IT: ${pkg.size}`);
pkg.deleteByKey(italianEntry.key);
Sandbox.output(`Size after deleting IT: ${pkg.size}`);
