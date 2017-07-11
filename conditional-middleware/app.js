const logger = require('koa-logger');
const Koa = require('koa');
const app = new Koa();

function ignoreAssets(mw) {
  return async function(ctx, next) {
    if(/(\.js|\.css|\.ico)$/.test(ctx.path)) {
      await next();
    } else {
      await mw.call(this, ctx, next);
    }
  };
}

app.use(ignoreAssets(logger()));

app.use(async function(ctx) {
  ctx.body = 'Hello World';
});

app.listen(3000);