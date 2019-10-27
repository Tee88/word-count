const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");

const parseText = function(word, body, selector) {
  word = word.toString().trim();
  if (!word.match(/[a-zA-Z]+/gi)) {
    throw new Error("Please insert a single word!");
  }

  const REGEX = new RegExp("(^|\\W)" + word + "($|\\W)", "gi");
  const dom = new JSDOM(body);
  const text = dom.window.document.querySelector(selector).innerHTML;
  const count = (text.match(REGEX) || []).length;
  return `${text}
  
    The generated text has ${count} ${
    count === 1 ? "'" + word + "'" : "'" + word + "'s"
  }.`;
};

const writeText = function(content) {
  if (typeof content !== "string") {
    throw new Error("Received content is not of type 'string'!");
  }

  const directoryPath =
    process.platform === "win32" ? "C:\\temp\\" : "../temp/";

  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }

  const filePath = `${directoryPath}and.txt`;

  fs.writeFileSync(filePath, content);
  console.log(`The file was saved at ${filePath}`);
};

module.exports = { parseText, writeText };
