const { XmlDocumentNode } = require("@s4tk/xml-dom");

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

// Using what you learned about elements, can you predict which node this is
// before running the script and seeing the output?
const node = root.child.child.child;
Sandbox.output(`Tag: ${node.tag}, Name: ${node.name}`);

// ==================================================
// Getting Values

// If you figured out what `node` is, can you guess what these two nodes are?
const [child1, child2] = node.children;
// If you're unfamiliar with this syntax, it's equivalent to the following:
// const child1 = node.children[0];
// const child2 = node.children[1];

// If you guessed these are a value and a comment, you're right. Since these are
// nodes and not primitive values, you can use their `value` property to get the
// actual string value that they contain. Can you guess what these next two
// lines will output?
Sandbox.output(`Child 1 value: ${child1.value}`);
Sandbox.output(`Child 2 value: ${child2.value}`);

// If you want the value within an element node without getting a reference to
// the value/comment node directly, you can use `innerValue`. This is an alias
// for `child.value`, and can be get and set. Do you know what will be output
// by the next line?
Sandbox.output(`Node inner value: ${node.innerValue}`);

// ==================================================
// Setting Values

// You can set the values just as easily. Can you guess what the output will
// look like before running the script?
child1.value = 1234567890n;
child2.value = "yeehaw";
root.child.child.children[1].innerValue = "SOMETHING";

Sandbox.output(root.toXml());
