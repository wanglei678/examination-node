module.exports = function (app, connection) {
  app.post("/user/list", function (req, res) {
    let username = req.body.userName
    let phone = req.body.phone
    let pageIndex = req.body.pageIndex
    let pageSize = req.body.pageSize
    let sql = ''
    if (!username && !phone) {
      sql = `select SQL_CALC_FOUND_ROWS * from User LIMIT ${pageIndex * pageSize},${pageSize};SELECT FOUND_ROWS() as total;`
    } else if (username && !phone) {
      sql = `select SQL_CALC_FOUND_ROWS * from User where username="${username}" LIMIT ${pageIndex * pageSize},${pageSize};SELECT FOUND_ROWS() as total;`
    } else if (!username && phone) {
      sql = `select SQL_CALC_FOUND_ROWS * from User where phone like '%${phone}%' LIMIT ${pageIndex * pageSize},${pageSize};SELECT FOUND_ROWS() as total;`
    } else {
      sql = `select SQL_CALC_FOUND_ROWS * from User where phone like '%${phone}%' and username="${username}" LIMIT ${pageIndex * pageSize},${pageSize};SELECT FOUND_ROWS() as total;`
    }
    connection.query(
      sql, function (err, results) {
        results[0].map(item => delete item.password)
        return res.send({ status: 200, message: "ok", data: results })
      }
    )
  })

  // 手机号查询用户信息
  app.post("/userInfo", function (req, res) {
    let phone = req.body.phone
    connection.query(
      `select * from User where phone='${phone}';`,
      function (err, results) {
        let res1 = results[0];
        delete res1.password
        return res.send({ status: 200, message: "ok", data: res1 })
      }
    )
  })
}