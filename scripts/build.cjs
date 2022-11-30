const fs = require("fs");
const path = require("path");
const glob = require("glob");

//#region Constants

const indent = false;

const srcDir = path.resolve(__dirname, "../src");

const outDir = path.resolve(__dirname, "../generated");

const tutorialDirs = fs
  .readdirSync(srcDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

//#endregion Constants

//#region Helpers

function readJson(filepath) {
  return JSON.parse(fs.readFileSync(filepath).toString());
}

function readPlainText(filepath) {
  return fs.readFileSync(filepath).toString();
}

function readBase64(filepath) {
  return fs.readFileSync(filepath).toString("base64");
}

function getSortedFiles(filepath, ext) {
  return glob.sync(path.join(filepath, `*.${ext}`)).sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
}

//#endregion Helpers

//#region Generation

const validTags = new Set(readJson(path.join(srcDir, "tags.json")));

const masterIndex = {
  version: 0,
  tutorials: {},
};

const tutorialDatas = [];

tutorialDirs.forEach((tutorialKey) => {
  const tutorialDir = path.join(srcDir, tutorialKey);
  const tutorialIndex = readJson(path.join(tutorialDir, "index.json"));

  tutorialIndex.tags.forEach((tag) => {
    if (!validTags.has(tag)) throw new Error(`Tag '${tag}' is not recognized.`);
  });

  masterIndex.tutorials[tutorialKey] = {
    key: tutorialKey,
    ...tutorialIndex,
  };

  const scripts = getSortedFiles(tutorialDir, "cjs").map(readPlainText);
  const htmls = getSortedFiles(tutorialDir, "html").map(readPlainText);

  const pages = [];
  for (let i = 0; i < scripts.length; ++i) {
    pages.push({
      script: scripts[i],
      html: htmls[i],
    });
  }

  const media = {};

  glob.sync(path.join(tutorialDir, "media", "*")).forEach((filepath) => {
    media[path.basename(filepath)] = readBase64(filepath);
  });

  tutorialDatas.push({
    key: tutorialKey,
    pages,
    media,
  });
});

//#endregion Generation

//#region Writing Files

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(
  path.join(outDir, "index.json"),
  JSON.stringify(masterIndex, null, indent ? 2 : 0)
);

const tutorialsOutDir = path.join(outDir, "tutorials");
if (!fs.existsSync(tutorialsOutDir))
  fs.mkdirSync(tutorialsOutDir, { recursive: true });

tutorialDatas.forEach((data) => {
  fs.writeFileSync(
    path.join(tutorialsOutDir, `${data.key}.json`),
    JSON.stringify(data, null, indent ? 2 : 0)
  );
});

//#endregion Writing Files
