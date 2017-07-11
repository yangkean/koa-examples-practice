const Koa = require('koa');
const app = new Koa();

app.use(async function pageNotFound(ctx) {
  ctx.status = 404;

  switch(ctx.accepts('html', 'json')) {
    case 'html':
      ctx.type = 'html';
      ctx.body = '<p>Page Not Found</p>';
      break;
    case 'json':
      ctx.body = {
        message: 'Page Not Found'
      };
      break;
    default:
      ctx.type = 'text';
      ctx.body = 'Page Not Found';
  };
});

app.listen(3000);
