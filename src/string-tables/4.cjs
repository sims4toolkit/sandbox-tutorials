// There are many ways you could have done this challenge,
// do not worry if the code doesn't match exactly

const { StringTableResource } = require("@s4tk/models");

const stbl = new StringTableResource([
  {
    key: 12345,
    value: "First",
  },
]);

Sandbox.output(`Initial size: ${stbl.size}`);
Sandbox.output(
  `Initial entry: ${stbl.entries[0].key} = ${stbl.entries[0].value}`
);

stbl.add(67890, "Second");
Sandbox.output(`Size after add: ${stbl.size}`);

const firstEntry = stbl.getByKey(12345);
Sandbox.output(`First entry value: ${firstEntry.value}`);

stbl.delete(firstEntry.id);
Sandbox.output(`Size after delete: ${stbl.size}`);

Sandbox.download("StringTable.stbl", stbl.getBuffer());
