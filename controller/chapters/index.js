let { getTime } = require("../../utils/getTime");
module.exports = function (app, connection) {
  // 获取章节列表
  app.post("/chaptersList", function (req, res) {
    let grade = req.body.grade;
    connection.query(
      `select * from Chapters where grade='${grade}';`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 添加章节
  app.post("/addChapter", function (req, res) {
    let grade = req.body.grade;
    let name = req.body.name;
    connection.query(
      `INSERT INTO Chapters(create_time,grade,name) VALUES('${getTime()}','${grade}','${name}');`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 编辑章节名称
  app.post("/editChapterName", function (req, res) {
    let id = req.body.id;
    let name = req.body.name;
    connection.query(
      `update Chapters set name='${name}' where id='${id}';`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 获取章节下的题目
  app.post("/queryChapterQuestions", function (req, res) {
    let zjid = req.body.zjid;
    connection.query(
      `select * from Questions where catalogType='1' and catalogId='${zjid}';`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 编辑单个题目
  app.post("/editQuestion", function (req, res) {
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

  // 删除单个题目
  app.post("/deleteQuestion", function (req, res) {
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

  // 删除单个章节及章节下的题目
  app.post("/deleteChapterAndQuestion", function (req, res) {
    let id = req.body.id;
    connection.query(
      `DELETE FROM Chapters  where id='${id}';DELETE FROM Questions  where catalogType='1' and catalogId='${id}';`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 同一章节批量导入题目
  app.post("/addQuestions", function (req, res) {
    let sql = '';
    req.body.map(item => {
      let zjid = item.zjid;
      let analysis = item.analysis;
      let answer = item.answer;
      let options = item.option;
      let title = item.title;
      let type = item.type;
      let create_time = getTime();
      sql += `INSERT INTO Questions SET catalogId='${zjid}',catalogType='1',analysis='${analysis}',answer='${answer}',options='${options}',title='${title}',type='${type}',create_time='${create_time}';`
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
