// jsdom is used to emulate enough of a subset of a web browser to be useful for testing and scraping real-world web applications.
// check (https://github.com/jsdom/jsdom)
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");

/**
 * Responsible for seraching a word within a text and building a string result.
 * @param {string} word The word you want to search for.
 * @param {string} body The target to search on (HTML string).
 * @param {string} selector The css selector of the  trageted HTML element.
 * @returns {string} The text to be written in the <tt>and.txt</tt> file.
 */
const parseText = function(word, body, selector) {
  word = word.toString().trim();
  if (!word.match(/[a-zA-Z]+/gi)) {
    throw new Error("Please insert a single word!");
  }

  // regex for matching a given word within any sentence/paragraph.
  const REGEX = new RegExp("(^|\\W)" + word + "($|\\W)", "gi");
  const { document } = new JSDOM(body).window;
  const text = document.querySelector(selector).textContent;
  const count = (text.match(REGEX) || []).length;
  return `${text}
  
    The generated text has ${count} ${
    count === 1 ? "'" + word + "'" : "'" + word + "'s"
  }.`;
};

/**
 * Responsible for writing a given text to the <tt>and.txt</tt> file.
 * @param {string} content The text to be written in the <tt>and.txt</tt> file.
 * @returns {undefined}
 */
const writeText = function(content) {
  if (typeof content !== "string") {
    throw new Error("Received content is not of type 'string'!");
  }
  // if the os is windows it will craete the 'C:\temp\' path, if not it will create '../temp'
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
