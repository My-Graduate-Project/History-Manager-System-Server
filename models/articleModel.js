// 引入 mysql 模块
const { query } = require("../configs/mysql")

/** 添加文章 */
// 1.1 用户添加文章基本内容 -- sql模块
module.exports.addArticleDetailModel = async (title, description, category_id, views, article_status, created_time, user_id) => {
  // 创建 sql 语句
  const sql = `
  INSERT INTO articles
  (title,description,category_id,views,article_status,created_time,user_id)
  values
  ('${title}','${description}','${category_id}','${views}','${article_status}','${created_time}','${user_id}')`
  return await query(sql)
}

// 1.2 获取文章ID -- sql模块
module.exports.getArticleIdModel = async (title) => {
  // 创建 sql 语句
  const sql = ` SELECT id FROM articles where title = '${title}'`
  return await query(sql)
}

// 1.3 获取当前用户ID -- sql模块
module.exports.getUserIdModel = async (username) => {
  // 创建 sql 语句
  const sql = ` SELECT id FROM admin where username = '${username}'`
  return await query(sql)
}

// 1.4 用户添加文章内容 -- sql模块
module.exports.addArticleContentModel = async (id, content) => {
  // 创建 sql 语句
  const sql = `
  INSERT INTO article_data
  (article_id, content)
  values
  ('${id}','${content}')`
  return await query(sql)
}
// -------------------------------------------------- //

/** 展示文章列表信息 */
// 2.1 获取用户的权限 -- sql模块
module.exports.getUserPermissionModel = async (username) => {
  // 创建 sql 语句
  const sql = ` SELECT privilege FROM admin where username = '${username}'`
  return await query(sql)
}

// 2.2 获取文章列表(管理员) -- sql模块
module.exports.getArticleAllListModel = async (pageNum, pageSize) => {
  // 创建 sql 语句
  const sql = ` SELECT * FROM articles LIMIT ${pageNum}, ${pageSize}`
  return await query(sql)
}

// 2.3 通过获取到的用户ID展示用户姓名(管理员) -- sql模块
module.exports.getUserNameModel = async (user_id) => {
  // 创建 sql 语句
  const sql = ` SELECT id,username FROM admin`
  return await query(sql)
}

// 2.4 根据普通用户的用户名查找对应的ID
module.exports.showArticleNormalUserIDModel = async (username) => {
  // 创建 sql 语句
  const sql = `SELECT id FROM admin WHERE admin.username ='${username}'`
  return await query(sql)
}

// 2.5 获取到用户名ID查找用户的文章
module.exports.showArticleNormalUserArticlesModel = async (id, pageNum, pageSize) => {
  // 创建 sql 语句
  const sql = `SELECT * FROM articles WHERE user_id=${id} LIMIT ${pageNum}, ${pageSize}`
  return await query(sql)
}
// -------------------------------------------------- //

/** 删除指定文章 -- 修改 is_deleted 为 true */
// 3.1 根据文章ID删除
module.exports.changeIsDeletedModel = async (id) => {
  // 创建 sql 语句
  const sql = `UPDATE articles SET article_status='delete' WHERE id=${id}`
  return await query(sql)
}
// -------------------------------------------------- //

/** 修改指定文章状态 -- 修改 article_status 为 （'pass','auditing','fail'） */
// 4.1 根据文章ID修改状态
module.exports.changeArticleStatusResultModel = async (id, status) => {
  // 创建 sql 语句
  const sql = `UPDATE articles SET article_status='${status}' WHERE id=${id}`
  return await query(sql)
}

// 5.1 查找文章
module.exports.findArticleModel = async (title, start, end) => {
  // 创建 sql 语句
  const sql = `SELECT * FROM articles WHERE title LIKE '%${title}%' AND created_time BETWEEN '${start}' AND '${end}'`
  return await query(sql)
}