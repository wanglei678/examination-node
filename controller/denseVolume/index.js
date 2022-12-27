let { getTime } = require("../../utils/getTime");
module.exports = function (app, connection) {
  // 获取密卷列表
  app.post("/denseVolumeList", function (req, res) {
    let grade = req.body.grade;
    connection.query(
      `select * from DenseVolume where grade='${grade}';`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 添加密卷
  app.post("/addDenseVolume", function (req, res) {
    let grade = req.body.grade;
    let name = req.body.name;
    connection.query(
      `INSERT INTO DenseVolume(create_time,grade,name) VALUES('${getTime()}','${grade}','${name}');`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 编辑密卷名称
  app.post("/editDenseVolumeName", function (req, res) {
    let id = req.body.id;
    let name = req.body.name;
    connection.query(
      `update DenseVolume set name='${name}' where id='${id}';`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 获取密卷下的题目
  app.post("/queryDenseVolumeQuestions", function (req, res) {
    let mjid = req.body.mjid;
    connection.query(
      `select * from mjtm where mjid='${mjid}';`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 编辑密卷单个题目
  app.post("/editDenseVolumesQuestion", function (req, res) {
    let tmid = req.body.tmid;
    let analysis = req.body.analysis;
    let answer = req.body.answer;
    let options = req.body.options;
    let title = req.body.title;
    let type = req.body.type;
    connection.query(
      `update mjtm set analysis='${analysis}',answer='${answer}',type='${type}',options='${options}',title='${title}' where tmid='${tmid}';`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 删除单个密卷题目
  app.post("/deleteDenseVolumesQuestion", function (req, res) {
    let tmid = req.body.tmid;
    connection.query(
      `DELETE FROM mjtm  where tmid='${tmid}'`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 删除单个密卷及密卷下的题目
  app.post("/deleteDenseVolumesAndQuestion", function (req, res) {
    let id = req.body.id;
    connection.query(
      `DELETE FROM DenseVolume  where id='${id}';DELETE FROM mjtm  where mjid='${id}';`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 同一密卷批量导入题目
  app.post("/addDenseVolumesQuestions", function (req, res) {
    let sql = '';
    req.body.map(item => {
      let mjid = item.mjid;
      let analysis = item.analysis;
      let answer = item.answer;
      let options = item.option;
      let title = item.title;
      let type = item.type;
      let create_time = getTime();
      sql += `INSERT INTO mjtm SET mjid='${mjid}',analysis='${analysis}',answer='${answer}',options='${options}',title='${title}',type='${type}',create_time='${create_time}';`
    })
    connection.query(sql ,function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });
};
