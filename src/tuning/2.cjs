const { XmlResource } = require("@s4tk/models");
const { XmlDocumentNode } = require("@s4tk/xml-dom");

const trait = new XmlResource(
  XmlDocumentNode.from(`
<I c="Trait" i="trait" m="traits.traits" n="some_trait" s="12345">
  <L n="ages">
    <E>YOUNGADULT</E>
    <E>ADULT</E>
  </L>
  <E n="trait_type">HIDDEN</E>
</I>
`)
);

// 1) Get the buffer
const buffer = trait.getBuffer();

// 2) Write the buffer (in Node, you'd use `fs.writeFileSync()`)
Sandbox.download("SomeTrait.xml", buffer);
