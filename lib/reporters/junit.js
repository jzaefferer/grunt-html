/*
 * Author: Iestyn Polley
 * https://github.com/iestyn
 */

'use strict';

const path = require('path');
const { encode } = require('../util');

function junit(results) {
  const files = {};
  const out = [];

  for (const result of results) {
    // Register the file
    result.file = path.normalize(result.file);
    if (!files[result.file]) {
      files[result.file] = [];
    }

    // Add the error
    files[result.file].push({
      severity: result.type,
      line: result.lastLine,
      column: result.lastColumn,
      message: result.message,
      source: `htmllint.Validation${result.type === 'error' ? 'Error' : 'Warning'}`
    });
  }

  const filesArray = Object.keys(files);

  out.push(`<?xml version="1.0" encoding="utf-8"?>\n<testsuite name="htmllint" tests="${filesArray.length}" failures="0" errors="${results.length}">`);

  for (const file of filesArray) {
    const errors = files[file];
    const errorsLength = errors.length;

    out.push(`<testcase name="${file}">\n<error message="${errorsLength} Errors">`);

    for (let i = 0; i < errorsLength; i++) {
      const error = errors[i];
      out.push(`${i + 1} line ${error.line}, char ${error.column}: ${encode(error.message)}`);
    }

    out.push('</error>\n</testcase>');
  }

  out.push('</testsuite>');

  return out.join('\n');
}

module.exports = junit;
