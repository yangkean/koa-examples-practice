const Koa = require('koa');
const koaBody = require('koa-body');
const session = require('koa-session');
const CSRF = require('koa-csrf');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

// csrf need session
app.keys = ['session key', 'csrf example'];
app.use(session(app));
app.use(koaBody());

app.use(new CSRF());

router.get('/token', token)
  .post('/post', post);

app.use(router.routes());

async function token(ctx) {
  ctx.body = ctx.csrf;
}

async function post(ctx) {
  ctx.body = {ok: true};
}

app.listen(3000);