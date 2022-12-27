let { getTime } = require("../../utils/getTime");
module.exports = function (app, connection) {
  // 获取模拟列表
  app.post("/simulationList", function (req, res) {
    let grade = req.body.grade;
    connection.query(
      `select * from Simulation where grade='${grade}';`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 添加模拟
  app.post("/addSimulation", function (req, res) {
    let grade = req.body.grade;
    let name = req.body.name;
    connection.query(
      `INSERT INTO Simulation(create_time,grade,name) VALUES('${getTime()}','${grade}','${name}');`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 编辑模拟名称
  app.post("/editSimulationName", function (req, res) {
    let id = req.body.id;
    let name = req.body.name;
    connection.query(
      `update Simulation set name='${name}' where id='${id}';`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 获取模拟下的题目
  app.post("/querySimulationQuestions", function (req, res) {
    let mnid = req.body.mnid;
    connection.query(
      `select * from mntm where mnid='${mnid}';`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 编辑模拟单个题目
  app.post("/editSimulationsQuestion", function (req, res) {
    let tmid = req.body.tmid;
    let analysis = req.body.analysis;
    let answer = req.body.answer;
    let options = req.body.options;
    let title = req.body.title;
    let type = req.body.type;
    connection.query(
      `update mntm set analysis='${analysis}',answer='${answer}',type='${type}',options='${options}',title='${title}' where tmid='${tmid}';`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 删除单个模拟题目
  app.post("/deleteSimulationsQuestion", function (req, res) {
    let tmid = req.body.tmid;
    connection.query(
      `DELETE FROM mntm  where tmid='${tmid}'`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 删除单个模拟及模拟下的题目
  app.post("/deleteSimulationsAndQuestion", function (req, res) {
    let id = req.body.id;
    connection.query(
      `DELETE FROM Simulation  where id='${id}';DELETE FROM mntm  where mnid='${id}';`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 同一模拟批量导入题目
  app.post("/addSimulationsQuestions", function (req, res) {
    let sql = '';
    req.body.map(item => {
      let mnid = item.mnid;
      let analysis = item.analysis;
      let answer = item.answer;
      let options = item.option;
      let title = item.title;
      let type = item.type;
      let create_time = getTime();
      sql += `INSERT INTO mntm SET mnid='${mnid}',analysis='${analysis}',answer='${answer}',options='${options}',title='${title}',type='${type}',create_time='${create_time}';`
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
