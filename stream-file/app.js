const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const extname = path.extname;
const app = new Koa();

app.use(async function(ctx) {
  const fpath = path.join(__dirname, ctx.path);
  const fstat = await stat(fpath);

  if(fstat.isFile()) {
    ctx.type = extname(fpath);
    ctx.body = fs.createReadStream(fpath);
  }
});

function stat(file) {
  return new Promise(function(resolve, reject) {
    fs.stat(file, function(err, stat) {
      if(err) {
        reject(err);
      } else {
        resolve(stat);
      }
    });
  });
}

app.listen(3000);