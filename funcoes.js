const fs = require("fs");
const path = require("path");

function readDirectory(folderPath) {
  return new Promise((resolve, reject) => {
    try {
      const files = fs.readdirSync(folderPath);
      const CompletedFiles = files.map((files) => {
        return path.join(folderPath, files);
      });
      resolve(CompletedFiles);
    } catch (e) {
      reject(e);
    }
  });
}

function readFile(folderPath) {
  return new Promise((resolve, reject) => {
    try {
      const content = fs.readFileSync(folderPath, { encoding: "utf-8" });
      resolve(content.toString());
    } catch (e) {
      reject(e);
    }
  });
}

function readFiles(folderPaths) {
  return Promise.all(folderPaths.map((paths) => readFile(paths)));
}

function elementsEndingWith(textPattern) {
  return function (array) {
    return array.filter((el) => el.endsWith(textPattern));
  };
}

function removeIfEmpty(array) {
  return array.filter((el) => el.trim());
}

function removeIfInclude(textPattern) {
  return function (array) {
    return array.filter((el) => !el.includes(textPattern));
  };
}

function removeIfNumber(array) {
  return array.filter((el) => {
    const num = parseInt(el.trim());
    return num !== num;
  });
}

function removeSimbles(simbles) {
  return function (array) {
    return array.map((el) => {
      return simbles.reduce((acc, simble) => {
        return acc.split(simble).join("");
      }, el);
    });
  };
}
function joinContent(array) {
  return array.join(" ");
}

function separateBy(simble) {
  return function (text) {
    return text.split(simble);
  };
}

function joinWords(words) {
  return Object.values(
    words.reduce((join, word) => {
      const w = word.toLowerCase();
      const qtd = join[w] ? join[w].qtd + 1 : 1;
      join[w] = { content: w, qtd };
      return join;
    }, {})
  );
}

function orderByAttrNumber(attr, order = "asc") {
  return function (array) {
    const asc = (o1, o2) => o1[attr] - o2[attr];
    const desc = (o1, o2) => o2[attr] - o1[attr];
    return array.sort(order === "asc" ? asc : desc);
  };
}

module.exports = {
  readDirectory,
  readFile,
  readFiles,
  elementsEndingWith,
  removeIfEmpty,
  removeIfInclude,
  removeIfNumber,
  removeSimbles,
  joinContent,
  separateBy,
  joinWords,
  orderByAttrNumber,
};
