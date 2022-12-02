const {
  formatResourceKey,
  formatStringKey,
} = require("@s4tk/hashing/formatting");

const resourceKey = {
  type: 0x220557da,
  group: 0x8000000,
  instance: 0x28fc74a94b197e5fn,
};

const formattedResourceKey = formatResourceKey(resourceKey, "-");
Sandbox.output(`Resource Key: ${formattedResourceKey}`);

const stringKey = 0x1329b718;
const formattedStringKey = formatStringKey(stringKey);
Sandbox.output(`String Key: ${formattedStringKey}`);
