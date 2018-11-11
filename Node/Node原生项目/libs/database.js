const mysql = require("mysql");
const co = require("co-mysql");
const DBCOnfig  = require("../config")

let conn = mysql.createPool({
  host:DBCOnfig.DB_HOST,
  port:DBCOnfig.DB_PORT,
  
})