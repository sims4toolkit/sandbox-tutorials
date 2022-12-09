// There are many ways you could have done this challenge,
// do not worry if the code doesn't match exactly

const { fnv64 } = require("@s4tk/hashing");
const { Package, StringTableResource } = require("@s4tk/models");
const { BinaryResourceType, StringTableLocale } = require("@s4tk/models/enums");

const pkg = new Package();

const resourceKey = {
  type: BinaryResourceType.StringTable,
  group: 0x80000000,
  instance: StringTableLocale.setHighByte(
    StringTableLocale.English,
    fnv64("MyStringTable")
  ),
};

const stbl = StringTableResource.from(await Sandbox.import("English.stbl"));

pkg.add(resourceKey, stbl);

const pkgBuffer = pkg.getBuffer();

// DO NOT WRITE BELOW THIS LINE! This will test that you did it correctly

Sandbox.test(
  "Challenge Complete",
  pkgBuffer.toString("base64") ===
    "REJQRgIAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAkAAAAAAAAAAAAAAAAAAAAAwAAAIkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeJwLDnHyYWVgYGSAAT4gLrmwXJ2Bl8EjNScnX0ehPL8oJ0URAHn+B/IAAAAA2lcFIgAAAICBBvkAXNxOkGAAAAApAACAKQAAAEJaAQA="
);
