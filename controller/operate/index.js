let { getTime } = require("../../utils/getTime");
module.exports = function (app, connection) {
  // 获取初级实操列表
  app.post("/operateList", function (req, res) {
    let { type, pageIndex, pageSize } = req.body;
    connection.query(
        `select SQL_CALC_FOUND_ROWS * from Operation where type="${type}" LIMIT 
        ${pageIndex * pageSize},${pageSize};SELECT FOUND_ROWS() as total;`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });
  // 新增实操
  app.post("/addOperate", function (req, res) {
    let { videoName, operateType, type } = req.body;
    connection.query(
        `INSERT INTO Operation(create_time,type,videoName,operateType) VALUES ('${getTime()}','${type}','${videoName}','${operateType}');`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });
  // 编辑初级实操
  app.post("/editOperate", function (req, res) {
    let { videoName, operateType, id } = req.body;
    connection.query(
        `update Operation set videoName='${videoName}',operateType='${operateType}' where id=${id};`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });
  // 删除实操
  app.post("/deleteOperate", function (req, res) {
    let { id } = req.body;
    connection.query(
        `DELETE FROM Operation  where id='${id}'`,
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
