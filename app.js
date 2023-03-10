const express = require('express');
const app = express();
const cors = require('cors');
let {jwtAuth} = require("./utils/jwt");
const mysql = require('mysql');
let path = require('path');
const bodyParser = require('body-parser');
let https = require('https')
let fs = require("fs")
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, './portal/dist')))
app.use(jwtAuth);
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 401,
      message: '登陆已超时或token不正确，请重新登陆！',
    })
  }
  res.send({
    status: 500,
    message: '未知的错误',
  })
})

const pool = mysql.createPool({
  host:"47.96.78.52",
  user:"root",
  password:"P@q998855006622",
  database:"user_manager",
  port:3306,
  multipleStatements: true
})
pool.getConnection(function(err,connection){})

let controller = require('./controller/controller')
controller(app, pool)
let options = {
  key: fs.readFileSync('./ssl/a.key'),
  cert: fs.readFileSync('./ssl/a.pem')
}
https.createServer(options, app).listen(443, '0.0.0.0');