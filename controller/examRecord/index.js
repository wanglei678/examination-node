module.exports = function (app, connection) {
  // 获取考试历史
  app.post("/queryExamRecord", function (req, res) {
    let {userId, grade, examType} = req.body;
    if(!userId ||!grade ||!examType ){
        return res.send({status: 400, message: "参数错误", data: null});
    }
    connection.query(
      `select * from ExamRecord where grade='${grade}' and userId='${userId}' and examType='${examType}';`,
      function (err, results) {
        return res.send({status: 200, message: "ok", data: results});
      }
    );
  });

  // 新增考试历史数据
  app.post("/addExamRecord", function (req, res) {
    let {userId, score, examType, grade} = req.body;
    if(!userId ||!grade ||!examType || !score ){
        return res.send({status: 400, message: "参数错误", data: null});
    }
    connection.query(
        `INSERT INTO ExamRecord(userId,score,examType,grade) VALUES('${userId}','${score}','${examType}','${grade}');`,
      function (err, results) {
        return res.send({status: 200, message: "ok", data: results});
      }
    );
  });
};
