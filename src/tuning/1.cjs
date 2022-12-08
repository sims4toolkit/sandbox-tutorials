// TODO:
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

// ==================================================
// The Content

// Get the string content with `content`
Sandbox.output(`emptyTuning.content: ${emptyTuning.content}\n`);
Sandbox.output(`tuningFromString.content:\n${tuningFromString.content}\n`);
Sandbox.output(`tuningFromDom.content:\n${tuningFromDom.content}\n`);

// Set the content with the same property
emptyTuning.content = `<I n="no_longer_empty"/>`;
Sandbox.output(`emptyTuning.content after setting:\n${emptyTuning.content}\n`);

// Note that setting the content will regenerate the DOM
Sandbox.test(
  "tuningFromDom.dom === sampleDom",
  tuningFromDom.dom === sampleDom
);

Sandbox.output("Setting tuningFromDom.content...");
tuningFromDom.content = `<I n="something_else"/>`;

Sandbox.test(
  "tuningFromDom.dom !== sampleDom",
  tuningFromDom.dom !== sampleDom
);

// ==================================================
// The DOM

// Note that `root` is an alias for `dom.child`, so we'll be using that instead
Sandbox.test(
  "dom.child === root",
  tuningFromString.dom.child === tuningFromString.root
);

// Since the dom/root are XmlNodes, you can use them like you learned in the
// XML DOMs tutorial, such as getting the `n` attribute with `name`
Sandbox.output(`tuningFromString.root.name: ${tuningFromString.root.name}\n`);

// IMPORTANT: Editing the dom/root does NOT automatically update the content,
// for instance, check the output for the following:
Sandbox.output("About to edit tuningFromString's DOM...");
tuningFromString.root.name = "newer_name";
Sandbox.output(`tuningFromString.content: ${tuningFromString.content}`);

// ==================================================
// Editing the DOM

// As you can see, the content still thinks the name is "something". However,
// just like setting the `content` property refreshes the DOM, setting the `dom`
// property refreshes the content.
tuningFromString.dom = tuningFromDom.dom;
Sandbox.output(
  `tuningFromString.content after setting dom: ${tuningFromString.content}`
);

// That works, but it's a little weird, unreadible, and easy to forget. A better
// way to ensure the content stays in sync is by using `updateDom()` and
// `updateRoot()`. They both accept a function as an argument, and that function
// should expect either the dom or the root as its argument. It will call the
// function, and once it terminates, it'll update the content accordingly.
tuningFromString.updateDom((dom) => {
  dom.child.name = "even_newer_name";
});

Sandbox.output(
  `tuningFromString.content after updateDom(): ${tuningFromString.content}`
);

tuningFromString.updateRoot((root) => {
  root.name = "newest_name";
});

Sandbox.output(
  `tuningFromString.content after updateRoot(): ${tuningFromString.content}`
);
