module.exports = function (app, connection) {
  app.post("/changePwd", function (req, res) {
    let {id, password} = req.body;
    connection.query(
      `update User set password='${password}' where id='${id}';`,
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
