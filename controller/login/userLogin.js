const jwt = require("jsonwebtoken");
const { createToken } = require("../../utils/jwt");
const axios = require("axios");
const wx = require("../../utils/wxconfig.json");
module.exports = function (app, connection) {
  app.post("/user/login", function (req, res) {
    let code = req.body.code;
    axios
      .get("https://api.weixin.qq.com/cgi-bin/token", {
        params: {
          appid: wx.appid,
          secret: wx.secret,
          js_code: code,
          grant_type: "client_credential",
        },
      })
      .then((resp) => {
        // console.log("sssssss", resp.data);
        const token = resp.data.access_token;
        if (token) {
          const url = `https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${token}`;
          axios.post(url, { code }).then((result) => {
            const data = result.data.phone_info;
            const phone = data.phoneNumber;
            if (phone) {
              connection.query(
                `select * from User where phone='${phone}'`,
                function (err, results, fields) {
                  console.log("sssssss 用户", results);
                  let flag = false;
                  let userInfo = {};
                  results.map((item) => {
                    if (item.role == "student" || item.role == "admin") {
                      userInfo = item;
                      flag = true;
                    }
                  });
                  if (flag) {
                    const time = new Date().getTime();
                    const tokenStr = createToken({ name: phone });
                    return res.send({
                      status: 200,
                      message: "登录成功！",
                      token: tokenStr,
                      expiresIn: time,
                      userInfo: userInfo,
                    });
                  } else {
                    return res.send({
                      status: 400,
                      message: "没有权限，请联系管理员!",
                    });
                  }
                }
              );
            } else {
              return res.send({
                status: 500,
                message: "获取手机号失败!",
              });
            }
          });
        }
      });
    // const userinfo = req.body;
    // connection.query(`select * from User where phone='${userinfo.phone}'`,function(err,results,fields){
    //   let flag = false;
    //   results.map(item => {
    //     if (userinfo.password == item.password && (item.role == 'sutdent' || item.role == 'admin')) flag = true;
    //   })
    //   if (flag) {
    //     const time = new Date().getTime();
    //     const tokenStr = createToken({name: userinfo.phone});
    //     return res.send({
    //       status: 200,
    //       message: '登录成功！',
    //       token: tokenStr,
    //       expiresIn: time
    //     })
    //   } else {
    //     return res.send({
    //       status: 400,
    //       message: '登录失败！',
    //     })
    //   }
    // })
  });
};
