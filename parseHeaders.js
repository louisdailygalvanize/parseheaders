'use strict';

/* eslint-env node */

function parseHeaders(text) {

  let linesArray = text.split('\n');
  // Destructuring our first line in text by splitting on a space and storing
  // the first value of the split array,
  const [version, code] = linesArray.shift().split(' ');

  // Adding the version and code properties to our response object.
  const responseObject = {version, code};
  responseObject.headers = {};

  let complete = false;

  // Loop over remaining lines until we no longer find key value pairs to store.
  while (!complete) {
    let lineData = linesArray.shift().split(': ');
    if (lineData.length === 2) {
      let key = lineData[0];
      let value = lineData[1];
      responseObject.headers[key] = value;
    } else {
      complete = true;
    }
  }

  // Once there aren't any more key value pairs to iterate over, join the
  // remaining lines and store them in the body property of our object.
  responseObject.body = linesArray.join('');

  return responseObject;
}

module.exports = parseHeaders;
