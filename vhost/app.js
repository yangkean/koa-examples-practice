const compose = require('koa-compose');
const Koa = require('koa');
const app = new Koa();

// virtual host apps
const wwwSubdomain = composer(require('./apps/koa'));
const barSubdomain = composer(require('./apps/array'));

function composer(app) {
  const middleware = app instanceof Koa ? app.middleware : app;
  return compose(middleware);
}

app.use(async function(ctx, next) {
  const start = new Date();
  await next();

  const ms = new Date() - start;
  if('test' !== process.env.NODE_ENV) {
    console.log(`${ctx.host} ${ctx.method} ${ctx.url} - ${ms}ms`);
  }
});

app.use(async function(ctx, next) {
  switch(ctx.hostname) {
    case 'localhost':
    case 'www.localhost':
      return await wwwSubdomain.apply(this, [ctx, next]);
    case 'bar.localhost':
      return await barSubdomain.apply(this, [ctx, next]);
  }

  return await next();
});

app.listen(3000);

