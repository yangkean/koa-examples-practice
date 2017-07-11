const Koa = require('koa');
const app = new Koa();
const sse = require('./sse');
const db = require('./db');

app.use(async function(ctx) {
  ctx.req.setTimeout(Number.MAX_VALUE);

  ctx.type = 'text/event-stream; charset=utf-8';
  ctx.set('Cache-Control', 'no-cache');
  ctx.set('Connection', 'keep-alive');

  const body = ctx.body = sse();
  const stream = db.subscribe('some event');
  stream.pipe(body);

  const socket = ctx.socket;
  socket.on('error', close);
  socket.on('close', close);

  function close() {
    stream.unpipe(body);
    socket.removeListener('error', close);
    socket.removeListener('close', close);
  }
});

app.listen(3000);