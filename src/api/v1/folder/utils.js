const { Folder } = require("@/models");

async function calculateNamePath({ path }) {
  let newPath = path.split("/").slice(1);
  let resultPath = [];

  for (let item of newPath) {
    let folder = await Folder.findById(item).exec();
    resultPath.push(folder.name);
  }

  resultPath.unshift(".");
  return resultPath.join("/");
}

module.exports = calculateNamePath;
