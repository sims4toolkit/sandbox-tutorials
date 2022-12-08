const { XmlResource } = require("@s4tk/models");
const { XmlDocumentNode } = require("@s4tk/xml-dom");

// Obviously real tuning would be longer, but this is just for example
const sampleTuning = `<I n="something"/>`;
const sampleDom = XmlDocumentNode.from(sampleTuning);

// ==================================================
// Creating Tuning

// No arguments for empty file
const emptyTuning = new XmlResource();

// One string argument for file with initial content
const tuningFromString = new XmlResource(sampleTuning);

// One DOM argument for file with initial content
const tuningFromDom = new XmlResource(sampleDom);

// Loading a file buffer with from()
const buffer = await Sandbox.import("Sample.xml");
const tuningFromBuffer = XmlResource.from(buffer);

// ==================================================
// The Content

// Get the string content with `content`
Sandbox.output(`emptyTuning.content:\n${emptyTuning.content}`);
Sandbox.output(`tuningFromString.content:\n${tuningFromString.content}\n`);
Sandbox.output(`tuningFromDom.content:\n${tuningFromDom.content}\n`);
Sandbox.output(`tuningFromBuffer.content:\n${tuningFromBuffer.content}\n`);

// For tuningFromDom, you will see an extra line that begins with <?xml...
// This is expected - XmlDocumentNode.toXml() automatically inserts it

// Set the content with the same property
emptyTuning.content = `<I n="no_longer_empty"/>`;
Sandbox.output(`emptyTuning.content after setting:\n${emptyTuning.content}\n`);

// The XML DOM will be discussed further on the next page, but for now, keep in
// mind that setting the content to a new value will cause the DOM to regenerate

Sandbox.test(
  "tuningFromDom.dom should be the original DOM",
  tuningFromDom.dom === sampleDom
);

Sandbox.output("Setting tuningFromDom.content...");
tuningFromDom.content = `<I n="something_else"/>`;

Sandbox.test(
  "tuningFromDom.dom should now be a different DOM",
  tuningFromDom.dom !== sampleDom
);
