const Readable = require('stream').Readable;
const co = require('co');

module.exports = class View extends Readable {
  constructor(context) {
    super();

    co.call(this, this.render).catch(context.onerror);
  }

  _read() {}

  *render() {
    this.push('<!DOCTYPE html><html><head><title>Hello World</title></head>');

    const body = yield done => {
      setImmediate(() => done(null, '<p>Hello World</p>'));
    };

    this.push(`<body>${body}</body>`);

    this.push('</html>');

    this.push(null);
  }
};