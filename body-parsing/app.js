const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

app.use(koaBody({
  jsonLimit: '1kb'
}));

router.get('/', home)
  .post('/', upper);

async function home(ctx) {
  ctx.body = '<form method="post"><input type="text" name="name"><input type="submit" value="submit"></form>';
}

async function upper(ctx) {
  console.log(ctx.request.body)
  const body = ctx.request.body;

  if(!body.name) ctx.throw(400, '.name required');

  ctx.body = {name: body.name.toUpperCase()};
}

app.use(router.routes());

app.listen(3000);