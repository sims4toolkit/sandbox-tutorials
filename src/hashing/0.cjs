const { fnv32, fnv64 } = require("@s4tk/hashing");

const valueToHash = "Text to hash";

Sandbox.output(
  `32-bit = ${fnv32(valueToHash)}`,
  `32-bit = ${fnv32(valueToHash, true)} (w/ high bit)`,
  `64-bit = ${fnv64(valueToHash)}`,
  `64-bit = ${fnv64(valueToHash, true)} (w/ high bit)`
);
