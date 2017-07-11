const Readable = require('stream').Readable;
const inherits = require('util').inherits;

exports.subscribe = function(event, options) {
  return Subscription(options);
};

inherits(Subscription, Readable);

function Subscription(options) {
  if(!(this instanceof Subscription)) return new Subscription(options);

  options = options || {};
  Readable.call(this, options);

  this.value = 0;
}

Subscription.prototype._read = function() {
  while(this.push(String(this.value++))) {}
};