const fs = require("fs");
const parseText = require("../src/utils").parseText;
const writeText = require("../src/utils").writeText;

jest.mock("fs");

describe("Text parsing function 'parseText()'", function() {
  it("should count when word in text is lowercase", function() {
    const word = "and";
    const HTMLBody = `
      <!DOCTYPE html>
      <html>
        <body>
          <h1>My Heading</h1>
          <p>My paragraph.</p>
          <textarea id="generatedtext">I love Pizza and chocolate and spicy food and that's it.</textarea>
        </body>
      </html>
    `;
    const result = parseText(word, HTMLBody, "#generatedtext");
    const expected = `The generated text has 3 'and's.`;
    expect(result).toEqual(expect.stringContaining(expected));
  });

  it("should count when word in text is uppercase", function() {
    const word = "and";
    const HTMLBody = `
      <!DOCTYPE html>
      <html>
        <body>
          <h1>My Heading</h1>
          <p>My paragraph.</p>
          <textarea id="generatedtext">I love Pizza And chocolate And spicy food And that's it.</textarea>
        </body>
      </html>
    `;
    const result = parseText(word, HTMLBody, "#generatedtext");
    const expected = `The generated text has 3 'and's.`;
    expect(result).toEqual(expect.stringContaining(expected));
  });

  it("should use singular expression when one match is found", function() {
    const word = "and";
    const HTMLBody = `
      <!DOCTYPE html>
      <html>
        <body>
          <h1>My Heading</h1>
          <p>My paragraph.</p>
          <textarea id="generatedtext">I love Pizza And chocolate.</textarea>
        </body>
      </html>
    `;
    const result = parseText(word, HTMLBody, "#generatedtext");
    const expected = `The generated text has 1 'and'.`;
    expect(result).toEqual(expect.stringContaining(expected));
  });

  it("should ignore whitespace in word", function() {
    const word = "   and   ";
    const HTMLBody = `
      <!DOCTYPE html>
      <html>
        <body>
          <h1>My Heading</h1>
          <p>My paragraph.</p>
          <textarea id="generatedtext">I love Pizza And chocolate And spicy food And that's it.</textarea>
        </body>
      </html>
    `;
    const result = parseText(word, HTMLBody, "#generatedtext");
    const expected = `The generated text has 3 'and's.`;
    expect(result).toEqual(expect.stringContaining(expected));
  });

  it("should ignore substrings", function() {
    const word = "and";
    const HTMLBody = `
      <!DOCTYPE html>
      <html>
        <body>
          <h1>My Heading</h1>
          <p>My paragraph.</p>
          <textarea id="generatedtext">Band, Sand, Husband, Demands, Commands, 8and, _and.</textarea>
        </body>
      </html>
    `;
    const result = parseText(word, HTMLBody, "#generatedtext");
    const expected = `The generated text has 0 'and's.`;
    expect(result).toEqual(expect.stringContaining(expected));
  });

  it("should count word before period", function() {
    const word = "and";
    const HTMLBody = `
      <!DOCTYPE html>
      <html>
        <body>
          <h1>My Heading</h1>
          <p>My paragraph.</p>
          <textarea id="generatedtext">and.</textarea>
        </body>
      </html>
    `;
    const result = parseText(word, HTMLBody, "#generatedtext");
    const expected = `The generated text has 1 'and'.`;
    expect(result).toEqual(expect.stringContaining(expected));
  });

  it("should count word before comma", function() {
    const word = "and";
    const HTMLBody = `
      <!DOCTYPE html>
      <html>
        <body>
          <h1>My Heading</h1>
          <p>My paragraph.</p>
          <textarea id="generatedtext">and, nothing else matters</textarea>
        </body>
      </html>
    `;
    const result = parseText(word, HTMLBody, "#generatedtext");
    const expected = `The generated text has 1 'and'.`;
    expect(result).toEqual(expect.stringContaining(expected));
  });

  it("should throw an error when string is empty", function() {
    const word = "";
    const HTMLBody = `
      <!DOCTYPE html>
      <html>
        <body>
          <h1>My Heading</h1>
          <p>My paragraph.</p>
          <textarea id="generatedtext">and, nothing else matters</textarea>
        </body>
      </html>
    `;

    function parseEmptyString() {
      parseText(word, HTMLBody, "#generatedtext");
    }

    expect(parseEmptyString).toThrowError(
      new Error("Please insert a single word!")
    );
  });

  it("should throw an error when string is a number", function() {
    const word = "123";
    const HTMLBody = `
      <!DOCTYPE html>
      <html>
        <body>
          <h1>My Heading</h1>
          <p>My paragraph.</p>
          <textarea id="generatedtext">123</textarea>
        </body>
      </html>
    `;

    function parseEmptyString() {
      parseText(word, HTMLBody, "#generatedtext");
    }

    expect(parseEmptyString).toThrowError(
      new Error("Please insert a single word!")
    );
  });
});

describe("Text writing function 'writeFile()'", function() {
  it("should throw an error when passed a non string", function() {
    const content = 123;
    function writeNumber() {
      writeText(content);
    }

    expect(writeNumber).toThrowError(
      new Error("Received content is not of type 'string'!")
    );
  });

  it("should not create the directory if it does exist", function() {
    fs.existsSync.mockReturnValue(true);
    const content = "something";
    writeText(content);
    expect(fs.mkdirSync).not.toHaveBeenCalled();
  });

  it("should create the directory if it doesn't exist", function() {
    fs.existsSync.mockReturnValue(false);
    const content = "something";
    writeText(content);
    expect(fs.mkdirSync).toHaveBeenCalled();
  });

  it("writes content to the target file", function() {
    const content = "something";
    writeText(content);
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
});
