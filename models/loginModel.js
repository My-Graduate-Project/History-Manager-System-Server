// 引入 mysql 模块
const { query } = require("../configs/mysql")

// 1. 用户注册sql模块
module.exports.registerModel = async (username, password, email) => {
  // 创建 sql 语句
  const sql = `INSERT INTO admin(username,password,email,privilege) value("${username}","${password}","${email}",'普通用户')`
  return await query(sql)
}

// 2. 查询用户是否存在
module.exports.userIsExistModel = async (username) => {
  // 创建 sql 语句
  const sql = `SELECT * FROM admin WHERE username="${username}"`
  return await query(sql)
}

// 3. 用户登录模块
module.exports.loginModel = async (username, password) => {
  // 创建 sql 语句
  const sql = `SELECT * FROM admin WHERE username="${username}" AND password="${password}"`
  return await query(sql)
}