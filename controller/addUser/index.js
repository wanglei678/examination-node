let { getTime } = require("../../utils/getTime");

module.exports = function (app, connection) {
  app.post("/addUser", function (req, res) {
    let name = req.body.username;
    let password = req.body.password;
    let role = req.body.role;
    let phone = req.body.phone;
    let idNo = req.body.idNo || null;
    let grade = req.body.grade || null;
    if (role !== 'manager' && role !== 'student') {
      return res.send({
        status: 400,
        message: "添加角色类型错误"
      });
    }
    connection.query(
      `INSERT INTO User(create_time,username,password,role,phone,idNo,grade) VALUES ('${getTime()}','${name}','${password}','${role}','${phone}','${idNo}','${grade}');`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results,
        });
      }
    );
  });
};
