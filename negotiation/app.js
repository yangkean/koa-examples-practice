const Koa = require('koa');
const app = new Koa();

const tobi = {
  _id: '123',
  name: 'tobi',
  species: 'ferret'
};

const loki = {
  _id: '321',
  name: 'loki',
  species: 'ferret'
};

const users = {
  tobi,
  loki
};

app.use(async function(ctx, next) {
  await next();

  if(!ctx.body) return;

  const type = ctx.accepts('json', 'html', 'xml', 'text');

  if(!type) ctx.throw(406); // not acceptable
console.log(ctx.body)
  switch(type) {
    case 'xml': ctx.type = 'xml';
      ctx.body =  `<name>${ctx.body.name}</name>`;
      return;
    case 'html': ctx.type = 'html';
      ctx.body =  `<h1>${ctx.body.name}</h1>`;
      return;
    default: ctx.type = 'text';
      ctx.body = ctx.body.name;
  }
});

app.use(async function(ctx, next) {
  await next();
console.log(ctx.body)
  if(!ctx.body) return;

  delete ctx.body._id;
});

app.use((ctx) => {
  const name = ctx.path.slice(1);
  const user = users[name];

  ctx.body = user;
});

app.listen(3000);
