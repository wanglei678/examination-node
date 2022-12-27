let { getTime } = require("../../utils/getTime");

module.exports = function (app, connection) {
  // 登录接口
  app.post("/addUser", function (req, res) {
    connection.query(
      `INSERT INTO jwttest_user(create_time,username,password) VALUES ('${getTime()}','${
        req.body.username
      }','${req.body.password}');`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });
};
