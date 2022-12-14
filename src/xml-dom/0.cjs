const { XmlDocumentNode } = require("@s4tk/xml-dom");

// You can load an XML DOM from a string or Buffer with XmlDocumentNode.from()
const doc = XmlDocumentNode.from(`
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
`);

// Remember, the document node itself is invisible; it is just a wrapper for
// the "real" nodes. What you really want is the root, which in this case, is
// the <I> tag. You can get the root of a document with the `child` property.
const root = doc.child;

// We'll discuss element nodes and their properties next, but for now, just know
// that you can get an element node's tag with the `tag` property.
const rootTag = root.tag;

// Let's make sure the root's tag is "I", to verify that the document loaded
Sandbox.test('Root tag should be "I"', rootTag === "I");
