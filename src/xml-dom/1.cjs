const { XmlDocumentNode, XmlElementNode } = require("@s4tk/xml-dom");

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

// Just for posterity, let's check the tag value again, make sure it's "I"
Sandbox.test('Root tag should be "I"', root.tag === "I");
