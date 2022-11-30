// ========================================
// String Tables

const { StringTableResource } = require("@s4tk/models");

const stbl = new StringTableResource();

stbl.addAndHash("First");
stbl.addAndHash("Second");
stbl.addAndHash("Third");

Sandbox.download("TutorialStringTable.stbl", stbl.getBuffer());

// ========================================
// Adding String Tables to Packages

const { Package } = require("@s4tk/models");
const { BinaryResourceType, StringTableLocale } = require("@s4tk/models/enums");
const { fnv64 } = require("@s4tk/hashing");

const pkg = new Package();

// when doing this for real, hash a more unique string
const instance = StringTableLocale.setHighByte(
  StringTableLocale.English,
  fnv64("SampleSTBL")
);

pkg.add(
  {
    type: BinaryResourceType.StringTable,
    group: 0x80000000,
    instance: instance,
  },
  stbl
);
