const {
  TuningResourceType,
  BinaryResourceType,
  SimDataGroup,
  StringTableLocale,
} = require("@s4tk/models/enums");
const { fnv64 } = require("@s4tk/hashing");
const { formatResourceKey } = require("@s4tk/hashing/formatting");

/*
  NOTE: Don't worry about the hashing and formatting code here, the point is to
  demonstrate where you'd use which enum.
*/

const traitInstance = fnv64("NameOfTrait");

const traitTuningKey = {
  type: TuningResourceType.Trait,
  group: 0,
  instance: traitInstance,
};

const traitSimDataKey = {
  type: BinaryResourceType.SimData,
  group: SimDataGroup.Trait,
  instance: traitInstance,
};

const stblInstanceBase = fnv64("NameOfStringTable");

const englishStblKey = {
  type: BinaryResourceType.StringTable,
  group: 0x80000000,
  instance: StringTableLocale.setHighByte(
    StringTableLocale.English,
    stblInstanceBase
  ),
};

const italianStblKey = {
  type: BinaryResourceType.StringTable,
  group: 0x80000000,
  instance: StringTableLocale.setHighByte(
    StringTableLocale.Italian,
    stblInstanceBase
  ),
};

// let's see what they look like
Sandbox.output(`Trait tuning:  ${formatResourceKey(traitTuningKey, "-")}`);
Sandbox.output(`Trait SimData: ${formatResourceKey(traitSimDataKey, "-")}`);
Sandbox.output(`English STBL:  ${formatResourceKey(englishStblKey, "-")}`);
Sandbox.output(`Italian STBL:  ${formatResourceKey(italianStblKey, "-")}`);
