const process = require('process')
let mode = (process.platform === "drawin"?"dev":'prod');


module.exports = {
  mode,
  /* 输出json，要用...(展开json) */
  ...(mode == "dev"?require('./config.dev'):require("./config.prod")),
}