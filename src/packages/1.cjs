const { Package } = require("@s4tk/models");

// ==================================================
// Reading a Package

// First, you need to get a buffer containing DBPF data
// This tutorial provides a package called "Sample.package"
const buffer = await Sandbox.import("Sample.package");

// Then, you can use the static `Package.from()` method to create a Package
const pkg = Package.from(buffer);

// Just to confirm that the pkg is loaded, check its size
Sandbox.output(`Loaded size: ${pkg.size}`);

// ==================================================
// Writing a Package

// To get the buffer for a package, use `getBuffer()`
const outputBuffer = pkg.getBuffer();

// Once you have the buffer, you can use `Sandbox.download()`
Sandbox.download("Sample.package", outputBuffer);

// Remember: In Node, you must use the `fs` module to read and write files,
// since `import()` and `download()` are specific to the sandbox.
