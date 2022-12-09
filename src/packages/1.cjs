const { Package } = require("@s4tk/models");

// ==================================================
// Reading a Package Binary

// first, you need to get a buffer containing DBPF data in the sandbox, use
// `Sandbox.import(filename)`
const buffer = await Sandbox.import("Sample.package");

// then, you can use the static `Package.from()` method to create a Package
const pkg = Package.from(buffer);

// just to confirm that the pkg is loaded, check its size
Sandbox.output(`Loaded size: ${pkg.size}`);

// ==================================================
// Writing a Package Binary

// to get the buffer for a package, use `getBuffer()`
const outputBuffer = pkg.getBuffer();

// once you have the buffer, you can use `Sandbox.download()`
Sandbox.download("Sample.package", outputBuffer);

// remember, in Node, you must use the `fs` module to read and write files
