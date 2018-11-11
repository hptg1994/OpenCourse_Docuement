// 路由表，其实就是一个json
let router={};
/* 这个路由的组织形式 */
/* let router = {
  get:{
    "/":function,
    "a":function
  },
  post:{
    "/":function,
    ...
  }
} */

function addRouter(method, url, fn){
  method=method.toLowerCase();
  url=url.toLowerCase();
  /* 看看router 里面有没有这个方法(GET POST PATCH DELETE)，有直接用，没有就加 */
  router[method]=router[method]||{};
  router[method][url]=fn;
}

function findRouter(method, url){
  method=method.toLowerCase();
  url=url.toLowerCase();

  if(!router[method] || !router[method][url]){
    return null;
  }else{
    return router[method][url];
  }
}

module.exports={
  addRouter, findRouter
};
