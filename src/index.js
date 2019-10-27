// 'Request' is designed to be the simplest way possible to make http calls.
// check (https://github.com/request/request)
const request = require("request");

const parseText = require("./utils").parseText;
const writeText = require("./utils").writeText;

const word = "and";

request("http://www.randomtextgenerator.com", function(err, response, body) {
  if (err) {
    throw new Error(err);
  }

  if (response && response.statusCode !== 200) {
    throw new Error(`The generated text has not been fetched
    statusCode: ${response.statusCode}`);
  }

  const result = parseText(word, body, "#generatedtext");

  writeText(result);
});
