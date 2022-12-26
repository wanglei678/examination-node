const jwt = require("jsonwebtoken");
const {createToken} = require("../../utils/jwt");
module.exports = function (app, connection) {
  app.post('/apis/login', function (req, res) {
    const userinfo = req.body;
    connection.query("select * from jwttest_user",function(err,results,fields){
      let flag = false;
      results.map(item => {
        if (userinfo.username == item.username && userinfo.password == item.password) flag = true;
      })
      if (flag) {
        const time = new Date().getTime();
        const tokenStr = createToken({username: userinfo.username});
        return res.send({
          status: 200,
          message: '登录成功！',
          token: tokenStr,
          expiresIn: time
        })
      } else {
        return res.send({
          status: 400,
          message: '登录失败！',
        })
      }
    })
  })
}