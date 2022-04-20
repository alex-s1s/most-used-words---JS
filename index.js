const path = require("path");
const fn = require("./funcoes");

const folderPath = path.join(__dirname, "..", "legendas");

const simbles = [
  ".",
  "?",
  "-",
  ",",
  '"',
  "♪",
  "_",
  "<i>",
  "</i>",
  "\r",
  "[",
  "]",
  "(",
  ")",
];

fn.readDirectory(folderPath)
  .then(fn.elementsEndingWith(".srt"))
  .then(fn.readFiles)
  .then(fn.joinContent)
  .then(fn.separateBy("\n"))
  .then(fn.removeIfEmpty)
  .then(fn.removeIfInclude("-->"))
  .then(fn.removeIfNumber)
  .then(fn.removeSimbles(simbles))
  .then(fn.joinContent)
  .then(fn.separateBy(" "))
  .then(fn.removeIfEmpty)
  .then(fn.removeIfNumber)
  .then(fn.joinWords)
  .then(fn.orderByAttrNumber("qtd", "desc"))
  .then(console.log);
