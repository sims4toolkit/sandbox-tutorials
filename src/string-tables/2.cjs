const { StringTableResource } = require("@s4tk/models");

// ==================================================
// Reading a String Table JSON (Array Literal)

// you can create the stbl JSON as an array literal
const json1 = [
  {
    key: 12345,
    value: "First",
  },
  {
    key: 67890,
    value: "Second",
  },
];

// and then load it directly into a string table
const stbl1 = new StringTableResource(json1);

// let's verify that the stbl was created correctly
Sandbox.test("should have size of 2", stbl1.size === 2);

Sandbox.test("first key should be 12345", stbl1.entries[0].key === 12345);

Sandbox.test(
  'second value should be "Second"',
  stbl1.entries[1].value === "Second"
);

// ==================================================
// Reading a String Table JSON (JSON File)

// this tutorial provides a JSON file called Sample.json
const jsonBuffer = await Sandbox.import("Sample.json");

// since import() returns a buffer, you need to convert
// the buffer to a string in order to use JSON.parse()
const jsonString = jsonBuffer.toString();

// let's see what that JSON actually looks like
Sandbox.output("Loaded JSON:", jsonString);

// JSON.parse() is a built-in JavaScript function that
// converts a JSON string to an object
const json2 = JSON.parse(jsonString);

// as long as the JSON is a list of objects with key/value
// pairs, you can pass it to new StringTableResource()
// to create a STBL with existing entries
const stbl2 = new StringTableResource(json2);

// just to confirm that the stbl is loaded, check its size
Sandbox.output(`stbl size: ${stbl2.size}`);

// ==================================================
// Writing a String Table JSON

// to get a JSON for a string table, use `toJsonObject()`
const outputJson = stbl2.toJsonObject();

// JSON.stringify() is a built-in JavaScript function that
// converts a JSON object to a string, the null/2 arguments
// are just for formatting purposes
const outputJsonString = JSON.stringify(outputJson, null, 2);

// once you have the JSON string, you can use `Sandbox.download()`
// to save it to your computer
Sandbox.download("StringTable.json", outputJsonString);
