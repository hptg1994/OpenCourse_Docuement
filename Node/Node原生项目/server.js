const process = require("process");

let mode = (process.platform === "darwin"?"dev":"prod")

console.log(mode);
