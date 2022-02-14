// 引入 mysql 模块
const { query } = require("../configs/mysql")

// 1. 用户添加文章基本内容 -- sql模块
module.exports.addArticleDetailModel = async (title, description, category_id, views, article_status, created_time, is_deleted, user_id) => {
  // 创建 sql 语句
  const sql = `
  INSERT INTO articles
  (title,description,category_id,views,article_status,created_time,is_deleted,user_id)
  values
  ('${title}','${description}','${category_id}','${views}','${article_status}','${created_time}','${is_deleted}','${user_id}')`
  return await query(sql)
}

// 1.1 获取文章ID -- sql模块
module.exports.getArticleIdModel = async (title) => {
  // 创建 sql 语句
  const sql = ` SELECT id FROM articles where title = '${title}'`
  return await query(sql)
}

// 2. 用户添加文章内容 -- sql模块
module.exports.addArticleContentModel = async (id, content) => {
  // 创建 sql 语句
  const sql = `
  INSERT INTO article_data
  (article_id, content)
  values
  ('${id}','${content}')`
  return await query(sql)
}
