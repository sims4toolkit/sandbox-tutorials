// Your objective is to start with the following XML document:
//
// <I c="Class" i="type" m="path" n="some_tuning" s="12345">
//   <T n="tunable">0<!--TODO--></T>
//   <L n="list" />
//   <T n="delete_me" />
// </I>
//
// And to turn it into the following:
//
// <I c="Class" i="type" m="path" n="some_tuning" s="12345">
//   <L n="list">
//     <E>FIRST</E>
//     <E>SECOND</E>
//   </L>
//   <T n="tunable">67890<!--some_other_tuning--></T>
// </I>

// Write your code here

// DO NOT WRITE BELOW THIS LINE! This will test that you did it correctly

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
