let { getTime } = require("../../utils/getTime");
module.exports = function (app, connection) {
  // 获取真题列表
  app.post("/trueTopicList", function (req, res) {
    let grade = req.body.grade;
    connection.query(
      `select * from TrueTopic where grade='${grade}';`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 添加真题
  app.post("/addTrueTopic", function (req, res) {
    let grade = req.body.grade;
    let name = req.body.name;
    connection.query(
      `INSERT INTO TrueTopic(create_time,grade,name) VALUES('${getTime()}','${grade}','${name}');`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 编辑真题名称
  app.post("/editTrueTopicName", function (req, res) {
    let id = req.body.id;
    let name = req.body.name;
    connection.query(
      `update TrueTopic set name='${name}' where id='${id}';`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 获取真题下的题目
  app.post("/queryTrueTopicQuestions", function (req, res) {
    let ztid = req.body.ztid;
    connection.query(
      `select * from Questions where catalogType='2' and catalogId='${ztid}';`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 编辑真题单个题目
  app.post("/editTrueTopicsQuestion", function (req, res) {
    let tmid = req.body.tmid;
    let analysis = req.body.analysis;
    let answer = req.body.answer;
    let options = req.body.options;
    let title = req.body.title;
    let type = req.body.type;
    connection.query(
      `update Questions set analysis='${analysis}',answer='${answer}',type='${type}',options='${options}',title='${title}' where tmid='${tmid}';`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 删除单个真题题目
  app.post("/deleteTrueTopicsQuestion", function (req, res) {
    let tmid = req.body.tmid;
    connection.query(
      `DELETE FROM Questions  where tmid='${tmid}'`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 删除单个真题及真题下的题目
  app.post("/deleteTrueTopicsAndQuestion", function (req, res) {
    let id = req.body.id;
    connection.query(
      `DELETE FROM TrueTopic  where id='${id}';DELETE FROM Questions  where catalogType='2' and catalogId='${id}';`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 同一真题批量导入题目
  app.post("/addTrueTopicsQuestions", function (req, res) {
    let sql = '';
    req.body.map(item => {
      let ztid = item.ztid;
      let analysis = item.analysis;
      let answer = item.answer;
      let options = item.option;
      let title = item.title;
      let type = item.type;
      let create_time = getTime();
      sql += `INSERT INTO Questions SET catalogId='${ztid}',catalogType='2',analysis='${analysis}',answer='${answer}',options='${options}',title='${title}',type='${type}',create_time='${create_time}';`
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
