let { getTime } = require("../../utils/getTime");
module.exports = function (app, connection) {
  // 获取章节列表
  app.post("/chaptersList", function (req, res) {
    let { grade } = req.body;
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
    let { grade, name } = req.body;
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
    let { id, name } = req.body;
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
    let { zjid } = req.body;
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
    let { tmid, analysis, answer, options, title, type } = req.body;
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
    let { tmid } = req.body;
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
    let { id } = req.body;
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
      let { zjid, analysis, answer, option, title, type } = item;
      let create_time = getTime();
      sql += `INSERT INTO Questions SET catalogId='${zjid}',catalogType='1',analysis='${analysis}',answer='${answer}',options='${option}',title='${title}',type='${type}',create_time='${create_time}';`
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
