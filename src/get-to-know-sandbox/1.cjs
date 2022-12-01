// import media files with `await Sandbox.import(filename)`
const stblBuffer = await Sandbox.import("Sample.stbl");
Sandbox.output(`The binary STBL data is: ${stblBuffer.toString("base64")}`);

// if you import a file that doesn't exist, you'll see an error
try {
  await Sandbox.import("shouldNotExist");
} catch (err) {
  Sandbox.output("Caught the error!");
}

// download files with `Sandbox.download(filename, content)`
Sandbox.download("MyStbl.stbl", stblBuffer);

// the content doesn't have to be a buffer, it can be a string, too
Sandbox.download("MyText.txt", "Look, mom - I'm being downloaded!");
