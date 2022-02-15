const { payload } = require("../utils/getTokenInfo")
// model
const {
  addArticleDetailModel,
  getArticleIdModel,
  getUserIdModel,
  addArticleContentModel,
  getUserPermissionModel,
  getArticleAllListModel,
  getUserNameModel
} = require("../models/articleModel")

// 添加文章功能
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
  // sql 模块 ① -- 获取当前用户的id
  const userId = await getUserIdModel(result.username)
  // sql模块 ② -- 添加文章的基本信息
  const detail = await addArticleDetailModel(
    title,
    description,
    category_id,
    views,
    article_status,
    created_time,
    is_deleted,
    userId[0].id
  )
  // sql 模块 ③ -- 获取添加文章的id
  const id = await getArticleIdModel(title)
  // console.log(id[0].id)
  // sql模块 ④ -- 添加文章的内容
  const contentResult = await addArticleContentModel(userId[0].id, content)

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

// 封装函数 -- 获取用户名
const getUserName = async (id) => {
  // sql模块 -- 获取用户名
  const userName = await getUserNameModel(id)
  return new Promise((resolve, reject) => {
    resolve(userName[0].username)
  })
}
// 封装函数 -- 修改用户ID
const changeUserId = (articleList) => {
  return new Promise((resolve, reject) => {
    // 遍历数组对象
    articleList.forEach(async (item, index) => {
      // sql模块 -- 获取用户名
      const userName = await getUserName(item.user_id)
      articleList[index].user_id = userName

      console.log(articleList)
    })
    return resolve(articleList)
  })
}

// 展示文章列表
module.exports.showArticleListCtrl = async (ctx, next) => {
  // 获取token
  const token = ctx.header.authorization
  // 解析token,获取用户信息
  let result = await payload(token);
  // sql模块 -- 获取用户权限
  const userPermission = await getUserPermissionModel(result.username)
  // 用来接收返回的数据
  // const getUserArticleListData = []
  // 条件判断 -- 判断是否是管理员
  // 管理员可以查看所有的文章列表
  // 普通用户只能查看自己的文章列表
  if (userPermission[0].privilege === "管理员") {
    // sql模块 ① -- 查询所有的文章列表
    const articleList = await getArticleAllListModel();
    // 遍历文章列表并将ID转换为用户名
    const articleListResult = await changeUserId(articleList)
    // console.log(articleListResult)
    // 判断是否查询成功
    next()
    if (articleListResult.length > 0) {
      ctx.body = {
        code: 200,
        privilege: "管理员",
        msg: "文章列表展示成功",
        // data: allArticleList
      }
    }
  }

}
