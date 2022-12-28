const jwt = require("jsonwebtoken");
const {createToken} = require("../../utils/jwt");
module.exports = function (app, connection) {
  app.post('/user/login', function (req, res) {
    const userinfo = req.body;
    connection.query(`select * from User where phone='${userinfo.phone}'`,function(err,results,fields){
      let flag = false;
      results.map(item => {
        if (userinfo.password == item.password && (item.role == 'sutdent' || item.role == 'admin')) flag = true;
      })
      if (flag) {
        const time = new Date().getTime();
        const tokenStr = createToken({name: userinfo.phone});
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