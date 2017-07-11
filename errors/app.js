const Koa = require('koa');
const app = new Koa();

app.use(async function(ctx, next) {
  try {
    await next();
  } catch(err) {
    ctx.status = err.status || 500;
    ctx.type = 'html';
    ctx.body = '<p>Something <em>exploded</em>, please contact S</p>';

    ctx.app.emit('error', err, ctx);
  }
});

app.use(async function() {
  throw new Error('ding');
});

app.on('error', function(err) {
  if(process.env.NODE_ENV !== 'test') {
    console.log(`sent error ${err.message} to the cloud`);
    console.log(err);
  }
});

app.listen(3000);
