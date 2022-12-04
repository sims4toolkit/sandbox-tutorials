// There are many ways you could have done this challenge,
// do not worry if the code doesn't match exactly

const { XmlDocumentNode } = require("@s4tk/xml-dom");
const { E } = require("@s4tk/tunables");

const root = XmlDocumentNode.from(`
<I c="Class" i="type" m="path" n="some_tuning" s="12345">
  <T n="tunable">0<!--TODO--></T>
  <L n="list" />
</I>
`).child;

const tunable = root.findChild("tunable");
// you should always use bigints for tuning IDs
tunable.children[0].value = 67890n;
tunable.children[1].value = "some_other_tuning";

const list = root.findChild("list");
list.addChildren(E({ value: "FIRST" }), E({ value: "SECOND" }));

root.sort();

Sandbox.test(
  "Challenge Completed",
  root.toXml() ===
    `<I c="Class" i="type" m="path" n="some_tuning" s="12345">
  <L n="list">
    <E>FIRST</E>
    <E>SECOND</E>
  </L>
  <T n="tunable">67890<!--some_other_tuning--></T>
</I>`
);
