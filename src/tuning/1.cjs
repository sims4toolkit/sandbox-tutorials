const { XmlResource } = require("@s4tk/models");
const { E } = require("@s4tk/tunables");

const trait = new XmlResource(`
<I c="Trait" i="trait" m="traits.traits" n="some_trait" s="12345">
  <L n="ages">
    <E>YOUNGADULT</E>
    <E>ADULT</E>
  </L>
  <E n="trait_type">HIDDEN</E>
</I>
`);

// ==================================================
// Accessing the DOM

// You can use the DOM like you learned in the XML DOMs tutorial
Sandbox.output(`Filename: ${trait.root.name}`);
Sandbox.output(`Tuning ID: ${trait.root.id}\n`);

// ==================================================
// Content vs. DOM

// IMPORTANT: Editing nodes within the DOM will *NOT* sync the content!
// For instance, let's edit something in the DOM and then view the `content`
trait.root.name = "new_trait";
Sandbox.output(`After changing name to 'new_trait':${trait.content}`);

// As seen in the output, the content still thinks the name is 'some_trait'...

// ==================================================
// Editing the DOM

// To sync the content with the previous edit, we can set `dom` equal to itself,
// since this will notify the XML resource that its DOM has changed and that it
// needs to update the content to match
trait.dom = trait.dom;
Sandbox.output(`After setting 'dom = dom':\n${trait.content}\n`);

// That works, but it's a little weird and easy to forget...

// A better way to ensure the content stays in sync is by using updateRoot().
// There is also an updateDom() method, but updateRoot() is more convenient.
// It accepts a function as an argument, and that function accepts the root as
// an argument. If you're new to JavaScript, this might sound confusing, but
// just take a look at an example:

trait.updateRoot((root) => {
  // updating the name, just like before
  root.name = "even_newer_trait";

  // and also adding in a whole new node, cause why not?
  root.findChild("ages").addChildren(E({ value: "ELDER" }));
});

// () => { } is just how you create an anonymous function in JavaScript - this
// function gets passed into the updateRoot() method, which will then call the
// anonymous function that you provided

Sandbox.output(`After updateRoot():\n${trait.content}`);
