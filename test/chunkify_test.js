'use strict';

const assert = require('assert');
const chunkify = require('../lib/chunkify');

describe('chunkify', () => {
  it('should chunkify results', done => {
    const files = [
      './some/long/path/to/1/file.html',
      './some/long/path/to/2/file.html',
      './some/long/path/to/3/file.html'
    ];
    const chunked = [
      '"./some/long/path/to/1/file.html" "./some/long/path/to/2/file.html"',
      '"./some/long/path/to/3/file.html"'
    ];
    const all = ['"./some/long/path/to/1/file.html" "./some/long/path/to/2/file.html" "./some/long/path/to/3/file.html"'];

    assert.deepStrictEqual(chunkify(files, 70), chunked, 'Should split the file list of file in 2 chunks');
    assert.deepStrictEqual(chunkify(files, 120), all, 'Should do a single chunk');
    done();
  });
});
