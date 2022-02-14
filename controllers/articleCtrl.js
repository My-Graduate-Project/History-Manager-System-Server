const { payload } = require("../utils/getTokenInfo")
// model
const { addArticleDetailModel, getArticleIdModel, addArticleContentModel } = require("../models/articleModel")

// 导出个人信息
module.exports.addArticleCtrl = async (ctx, next) => {
  // 获取token
  const token = ctx.header.authorization
  // 解析token,获取用户信息
  let result = await payload(token);
  // 获取文章信息
  const {
    title,
    description,
    content,
    category_id,
    views,
    article_status,
    created_time,
    is_deleted,
    user_id
  } = ctx.request.body
  // sql模块 ① -- 添加文章的基本信息
  const detail = await addArticleDetailModel(
    title,
    description,
    category_id,
    views,
    article_status,
    created_time,
    is_deleted,
    user_id
  )
  // sql 模块 ② -- 获取添加文章的id
  const id = await getArticleIdModel(title)
  // console.log(id[0].id)

  // sql模块 ② -- 添加文章的内容
  const contentResult = await addArticleContentModel(id[0].id, content)

  // 判断是否添加成功
  if (detail.affectedRows === 1 && contentResult.affectedRows === 1) {
    ctx.body = {
      code: 200,
      msg: "文章添加成功"
    }
  } else {
    ctx.body = {
      code: 400,
      msg: "文章添加失败"
    }
  }

}
