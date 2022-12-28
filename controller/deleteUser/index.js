module.exports = function (app, connection) {
  // 登录接口
  app.post("/delete/user", function (req, res) {
    let id = req.body.id;
    connection.query(
      'DELETE FROM User where id="' + id + '"',
      function (err, results, fields) {
        return res.send({
          status: 200,
          message: "删除成功！",
          data: results || ''
        });
      }
    );
  });
};
