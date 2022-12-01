// this will log an error, because you cannot use `runScript` in tutorials
const value = await Sandbox.runScript("someOtherScript");

// even though this does nothing during a tutorial, this is how you would
// return a value from a script, so that another script can call this one
// and use its output
return "Something!";
