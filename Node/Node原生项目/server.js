const db = require('./libs/database');
const http = require('./libs/http');
const { addRouter } = require('./libs/router');
const process = require("process");
/* 添加功能 */
/* addRouter("method","url",function) */
/* list 取数据 */
addRouter('get', '/list', async (res, get, post, files) => {
  try {
    let data = await db.query(`SELECT * FROM item_table`);
    /* write不能直接把Json发送给浏览器，所以要用writeJson这个方法 */
    res.writeJson({ error: 0, data });
  } catch (e) {
    res.writeJson({ error: 1, msg: 'database error' });
  }
  res.end();
});

addRouter('post', '/add', async (res, get, post, files) => {
  let { title, price, count } = post;

  /* 没有参数，没给数据 */
  if (!title || !price || !count) {
    res.writeJson({ error: 1, msg: 'params invaild' });
    res.end();
  } else {
    /* 转成数字 */
    price = Number(price);
    count = Number(count);

    if (isNaN(price) || isNaN(count)) {
      res.writeJson({ error: 1, msg: 'params invaild' });
      res.end();
    } else {
      try {
        /* ？ 是占位符，它们的位置是数组，数据库提供给我们的，防止有些作乱份子 */
        await db.query('INSERT INTO item_table (title, price, count) VALUES(?,?,?)', [title, price, count]); 
        res.writeJson({ error: 0, msg: 'success' });
      } catch (e) {
        res.writeJson({ error: 1, msg: 'database error' });
      }
      res.end();
    }
  }
});

addRouter('get', '/del', async (res, get, post, files) => {

});
