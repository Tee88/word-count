# word-count

## Task Description

Create a script or app that downloads the webpage at http://www.randomtextgenerator.com and checks how many times the word "and" appears within the `<textarea id="generatedtext">` ... `</textarea>` element.

It should then create a new file at the path "C:\temp\and.txt" and write the contents of the `<textarea id="generatedtext">` element to the file, as well as the number of times the word "and" appears within it at the bottom of the file.

## Dependencies

- [Request](https://github.com/request/request) : a simplified HTTP client for Node.js.
- [Jsdom](https://github.com/jsdom/jsdom) : Unlike js is the browser, Node.js has no built-in DOM manipulation capabilities. To solve this issue we use Jsdom.
- [Jest](https://jestjs.io/) (dev dependency) : Testing framework.
- [Jsdoc](https://devdocs.io/jsdoc-getting-started/) (dev dependency) : Documentation genertor for Javascript.

## Instructions

### prerequisites

- Node.js

### Installation

1. Clone project locally using `git clone git@github.com:Tee88/word-count.git`
2. Navigate to the project's root directory and install dependencies using `npm install`
3. Run tests using `npm run test`
4. Navigate to `<project's root>/src` and run `node index.js` to run the script.
5. Open `<project's root>/temp/and.txt` to see results.

Note: To Generate docs using `npm run docs` in root the project's directory then open `<project's root>/docs/global.html` in browser to read docs.

## Features

- The script dynamically accepts any word besides 'and' to be searched. Just update the value of `word` in `index.js`.
- The searched word can be both, lowercase and uppercase.
- If the script was ran on Windows, the result will be saved in `C:\temp\and.txt`. Otherwise, it will be saved under `<project's root>/temp/and.txt`

## Future Work

- Create CLI tool where the user can dynamically insert the page's url, word to be searched and the css selector.
