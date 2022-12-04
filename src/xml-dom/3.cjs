const {
  XmlDocumentNode,
  XmlElementNode,
  XmlValueNode,
  XmlCommentNode,
} = require("@s4tk/xml-dom");

// Starting with this document, let's add another tuple to "some_list"
const root = XmlDocumentNode.from(`
<I c="Class" i="type" m="path" n="some_tuning" s="12345">
  <L n="some_list">
    <U>
      <T n="tunable">11111<!--first--></T>
      <E n="enum">FIRST</E>
    </U>
  </L>
</I>
`).child;

// ==================================================
// Constructors

// Remember that you can get "some_list" with `root.child`
// Read the tutorial guide for more information about `addChildren()`
root.child.addChildren(
  // You can create a new XmlElementNode with its constructor, which accepts an
  // object with `tag`, `attributes`, and `children` properties. Tag is a string,
  // attributes is an object of strings, and children is a list of nodes.
  new XmlElementNode({
    tag: "U",
    children: [
      new XmlElementNode({
        tag: "T",
        attributes: {
          n: "tunable",
        },
        // To create a new value node, you can use its constructor and pass in
        // a number, bigint, strings, or boolean. For comments, only strings
        // are allowed
        children: [new XmlValueNode(22222), new XmlCommentNode("second")],
      }),
      new XmlElementNode({
        tag: "E",
        attributes: {
          n: "enum",
        },
        children: [new XmlValueNode("SECOND")],
      }),
    ],
  })
);

// Now, let's see what the resulting XML document looks like
Sandbox.output(root.toXml());

// As you can see, this worked! However, it is rather tedious to make nodes this
// way, and sometimes may be more work than just writing the XML yourself. That's
// where @s4tk/tunables comes in.

// ==================================================
// @s4tk/tunables

// In regular scripts, all of your `require()` statements should be at the top
const { U, T, E } = require("@s4tk/tunables");

root.child.addChildren(
  U({
    children: [
      T({
        name: "tunable",
        value: 33333,
        comment: "third",
      }),
      E({
        name: "enum",
        value: "THIRD",
      }),
    ],
  })
);

// Now, let's again see what the resulting XML document looks like
Sandbox.output("", root.toXml()); // just outputting "" for newline

// As you can see, you get the same result with less, more readible code,
// thanks to @s4tk/tunables. There is more to @s4tk/tunables than this, so be
// sure to read those docs and check out its tutorial when you're done

// ==================================================
// Clones

// This gets the first <U>, and returns a new node with the same properties
const clone = root.child.child.clone();

// Now that you have a clone, you can edit it without affecting the original
const [t, e] = clone.children;

t.innerValue = 44444;
t.children[1].value = "fourth";
e.innerValue = "FOURTH";

root.child.addChildren(clone);

// Now, let's again see what the resulting XML document looks like
Sandbox.output("", root.toXml()); // just outputting "" for newline
