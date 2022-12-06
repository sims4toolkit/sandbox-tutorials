// the @s4tk/models package contains all of S4TK's models
const { Package, StringTableResource } = require("@s4tk/models");

// packages are represented by the "Package" class model
const pkg = new Package();

// string tables are represented by the "StringTableResource" class model,
// and since string tables can be contained by packages, they are a resource
const stbl = new StringTableResource();

// this is a buffer, they are built-in to Node
const buffer = Buffer.from("This is a buffer! See? They're not scary.");
Sandbox.output(buffer.toString());
