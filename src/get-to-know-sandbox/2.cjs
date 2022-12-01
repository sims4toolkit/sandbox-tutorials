const { Package } = require("@s4tk/models");
const { TuningResourceType } = require("@s4tk/models/enums");
const { fnv64 } = require("@s4tk/hashing");

const pkg = new Package();

Buffer.from("This is going to be a file.");

pkg.add(
  {
    type: TuningResourceType.Tuning,
    group: 0,
    instance: fnv64("something"),
  }
  // TODO:
);
