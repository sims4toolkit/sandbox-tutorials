const { XmlDocumentNode } = require("@s4tk/xml-dom");
const { T } = require("@s4tk/tunables");

const root = XmlDocumentNode.from(`
<I c="Class" i="type" m="path" n="some_tuning" s="12345">
  <T n="first">1</T>
  <T n="second">2</T>
  <T n="third">3</T>
</I>
`).child;

// ==================================================
// Finding Children

// To get the "second" node, you could use root.children[1], but that's not
// very readible and is subject to break if any items are added or removed.
// Instead, search for the node by name with findChild()
const secondNode = root.findChild("second");

// Let's verify that the node we got is what we expect. Remember, number values
// are ALWAYS loaded as strings, due to precision issues with 64-bit numbers
Sandbox.test("secondNode's value should be 2", secondNode.innerValue === "2");

// ==================================================
// Sorting Children

// Let's add a <T n="fourth">4</T>. Remember that addChildren() adds your node
// to the end of the children list, so the result of this will be:
//
// <I c="Class" i="type" m="path" n="some_tuning" s="12345">
//   <T n="first">1</T>
//   <T n="second">2</T>
//   <T n="third">3</T>
//   <T n="fourth">4</T>
// </I>
//
// While that makes numerical sense in this case, it wouldn't be best for real
// tuning, where things should be sorted alphabetically.

root.addChildren(T({ name: "fourth", value: 4 }));

Sandbox.output("\nBefore sorting:", root.toXml());

root.sort();

Sandbox.output("\nAfter sorting:", root.toXml());
