const Koa = require('koa');
const View = require('./view');
const app = new Koa();

app.use((ctx) => {
  ctx.type = 'html';
  ctx.body = new View(ctx);
});

app.listen(3000);