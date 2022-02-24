// 引入 mysql 模块
const { query } = require("../configs/mysql")

// 1.1 展示人物信息
module.exports.showCharacterInfoModel = async (ctx, next) => {
  // sql 语句
  const sql = 'select character_img,character_name,character_description from `character` limit 0,5'
  // 返回
  return await query(sql)
}