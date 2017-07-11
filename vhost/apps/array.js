async function responseTime(ctx, next) {
  const start = new Date();
  await next();

  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
}

async function index(ctx, next) {
  await next();
  if('/' !== ctx.url) return;

  ctx.body = 'Hello? From bar middleware bundle';
}

module.exports = [
  responseTime,
  index
];