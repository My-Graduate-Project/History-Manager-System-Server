// 引入 mysql 模块
const { query } = require("../configs/mysql")

// 1. 用户注册sql模块
module.exports.permissionModel = async (username) => {
  // 创建 sql 语句
  const sql = `SELECT privilege FROM admin WHERE username='${username}'`
  return await query(sql)
}
