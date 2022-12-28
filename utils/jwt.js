//用一个单独模块来放生成token和验证token的方法，方便后面调用。
const { secretKey } = require("./salt");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
//生成 token
const createToken = payload =>
  jwt.sign(payload, secretKey, {
    expiresIn: 60 * 60 * 24 // 设置token的有效期 单位（秒） 
  });

// 验证 token
const jwtAuth = expressJwt({
  secret: secretKey,
  algorithms: ["HS256"],
  // credentialsRequired: true //这个是Token请求不进行解析和抛出异常，可以不设置这个
}).unless({
  path: ["/users/login", "/apis/login", "/login"] //不需要校验的路径
});
module.exports = { jwtAuth, createToken };