// There are many ways you could have done this challenge,
// do not worry if the code doesn't match exactly

const { XmlResource } = require("@s4tk/models");

const tuning = new XmlResource(`
<I c="Trait" i="trait" m="traits.traits" n="some_trait" s="12345">
  <L n="ages">
    <E>YOUNGADULT</E>
    <E>ADULT</E>
  </L>
  <E n="trait_type">HIDDEN</E>
</I>
`);

tuning.updateRoot((root) => {
  // YOUNGADULT is at index 0, so delete 1 item at index 0
  root.findChild("ages").children.splice(0, 1);

  root.findChild("trait_type").innerValue = "GAMEPLAY";
});

// DO NOT WRITE BELOW THIS LINE! This will test that you did it correctly

Sandbox.test(
  "Challenge Completed",
  tuning.content ===
    `<?xml version="1.0" encoding="utf-8"?>
<I c="Trait" i="trait" m="traits.traits" n="some_trait" s="12345">
  <L n="ages">
    <E>ADULT</E>
  </L>
  <E n="trait_type">GAMEPLAY</E>
</I>`
);
