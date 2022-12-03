const { XmlDocumentNode } = require("@s4tk/xml-dom");

// There is no need to import XmlElementNode, since we're never using the class
// itself or its constructor. Creating new XmlElementNodes will be covered on
// a later page.

// This is the same doc loaded on the last page, but we're using the `child`
// property to get the root immediately -- remember, `root` is the <I> node,
// which is an instance of the XmlElementNode class
const root = XmlDocumentNode.from(`
<I c="Class" i="type" m="path" n="some_tuning" s="12345">
  <L n="list_of_tuples">
    <U>
      <T n="tunable">67890<!--something--></T>
      <E n="enum_value">VALUE_1</E>
    </U>
    <U>
      <T n="tunable">24680<!--something_else--></T>
      <E n="enum_value">VALUE_2</E>
    </U>
  </L>
</I>
`).child;

// ==================================================
// Tags

// Just for posterity, let's check the tag value again, make sure it's "I"
Sandbox.test('root.tag should be "I"', root.tag === "I");

// Even though you'd probably never do this, it's possible to set the tag
root.tag = "M";

// If you check the tag now, or write the XML as a string, you'll see that
// the entire thing is now contained in `<M>...</M>`

// ==================================================
// Attributes

// To access attributes, use `attributes`
Sandbox.test(
  'root.attributes.n should be "some_tuning"',
  root.attributes.n === "some_tuning"
);

// Some attributes, like `n`, have aliases
Sandbox.test('root.name should be "some_tuning"', root.name === "some_tuning");

// To set an attribute's value, just set its key on the `attributes` object
root.attributes.n = "fancy_new_name";
Sandbox.output(`File name changed to "${root.name}"`);

// If an attribute has an alias, you can also set that
root.name = "fancier_newer_name";
Sandbox.output(`File name changed to "${root.attributes.n}"`);

// Notice how `attributes.n` and `name` are fully in sync with each other.
// When you update one, the other changes -- that's because they're the exact
// same thing. This also goes for all other attribute aliases.

// One thing to be mindful of is that all attributes are parsed as strings.
// Yes, even `s` -- if it were parsed as a number, it would lose precision.
Sandbox.test("root.id should be a string", typeof root.id === "string");

// If you need the tuning ID as a number, you MUST use a bigint -- numbers lose
// precision after 53 bits, and tuning IDs can go up to 64 bits
const tuningID = BigInt(root.id);
Sandbox.test("tuningID should be a bigint", typeof tuningID === "bigint");

// ==================================================
// Children

// To access an element's children list, use `children`
Sandbox.test("root should only have one child", root.children.length === 1);

// You can also use `child` to get the first node in `children`
Sandbox.test("root's child should be an L tag", root.child.tag === "L");
Sandbox.test(
  'root\'s child should ne named "list_of_tuples"',
  root.child.name === "list_of_tuples"
);
