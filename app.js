const express = require('express');
const app = express();
const cors = require('cors');
let {jwtAuth} = require("./utils/jwt");
const mysql = require('mysql');
let path = require('path');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use(jwtAuth);
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 401,
      message: '无效的token',
    })
  }
  res.send({
    status: 500,
    message: '未知的错误',
  })
})
app.use(express.static(path.join(__dirname, './portal/dist')))

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
app.listen(8080, function () {
  console.log('Express server running at 8080')
})