flarmnet
==============================================================================

[![TravisCI Build Status][travis-badge]][travis-badge-url]
[![Latest NPM release][npm-badge]][npm-badge-url]

[npm-badge]: https://img.shields.io/npm/v/flarmnet.svg
[npm-badge-url]: https://www.npmjs.com/package/flarmnet
[travis-badge]: https://img.shields.io/travis/com/Turbo87/flarmnet-js/master.svg
[travis-badge-url]: https://travis-ci.com/Turbo87/flarmnet-js

[Flarmnet](http://flarmnet.org/) Encode/Decoder


Install
------------------------------------------------------------------------------

```
npm install flarmnet
```


Usage
------------------------------------------------------------------------------

```js
const FlarmNet = require('flarmnet');

let flarmNet = FlarmNet.decode(fs.readFileSync('data.fln', 'utf8'));

expect(flarmNet).toEqual({
  version: 28592,
  records: [
    {
      airfield: 'EDKA',
      callsign: 'SG',
      frequency: '123.450',
      id: 'DD1234',
      pilot: 'John Doe',
      plane_type: 'LS6a',
      registration: 'D-0816',
    },
    // ...
  ],
});
```


License
------------------------------------------------------------------------------

This project is released under the [MIT License](LICENSE.md).
