const render = require('./lib/render');
const logger = require('koa-logger');
const Router = require('koa-router');
const koaBody = require('koa-body');
const Koa = require('koa');
const app = new Koa();
const router = new Router();

// 'database'
const posts = [];

app.use(logger());

app.use(render);

app.use(koaBody());

// route definitions
router.get('/', list)
  .get('/post/new', add)
  .get('/post/:id', show)
  .post('/post', create);

app.use(router.routes());

// Post listing
async function list(ctx) {
  await ctx.render('list', {posts: posts});
}

// Show creation form
async function add(ctx) {
  await ctx.render('new');
}

// Show post :id
async function show(ctx) {
  const id = ctx.params.id;
  const post = posts[id];

  if(!post) ctx.throw(404, 'invalid post id');
  await ctx.render('show', {post: post});
}

// Create a post
async function create(ctx) {
  const post = ctx.request.body;
  const id = posts.push(post) - 1;
  post.created_at = new Date();
  post.id = id;
  ctx.redirect('/');
}

app.listen(3000);
