// Your objective is to start with this tuning:
//
// <I c="Trait" i="trait" m="traits.traits" n="some_trait" s="12345">
//   <L n="ages">
//     <E>YOUNGADULT</E>
//     <E>ADULT</E>
//   </L>
//   <E n="trait_type">HIDDEN</E>
// </I>
//
// And to turn it into the following:
//
// <?xml version="1.0" encoding="utf-8"?>
// <I c="Trait" i="trait" m="traits.traits" n="some_trait" s="12345">
//   <L n="ages">
//     <E>ADULT</E>
//   </L>
//   <E n="trait_type">GAMEPLAY</E>
// </I>

// Write your code here

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
