const { payload } = require("../utils/getTokenInfo")
// model
const {
  addArticleDetailModel,
  getArticleIdModel,
  getUserIdModel,
  addArticleContentModel,
  getUserPermissionModel,
  getArticleAllListModel,
  getUserNameModel,
  showArticleNormalUserIDModel,
  showArticleNormalUserArticlesModel
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
  const userInfo = await getUserNameModel(id)
  // console.log(...userInfo)
  return {
    id: userInfo[0].id,
    username: userInfo[0].username
  }
}
// 封装函数 -- 修改用户ID
const changeUserId = (articleList) => {
  return new Promise((resolve, reject) => {
    try {
      articleList.forEach((item, index) => {
        console.log(index)
        Promise.all([getUserName(item.user_id)]).then(res => {
          if (item.user_id === res[0].id) {
            item.user_id = res[0].username
            resolve(articleList)
          }
        })
      })
    } catch (error) {
      reject(error, "错误信息")
    }
  })
}

// 展示文章列表
module.exports.showArticleListCtrl = async (ctx, next) => {
  // 获取token
  const token = ctx.header.authorization
  // 解析token,获取用户信息
  let result = await payload(token);
  // console.log(result)
  // sql模块 -- 获取用户权限
  const userPermission = await getUserPermissionModel(result.username)
  // 用来接收返回的数据
  // const getUserArticleListData = []
  // 条件判断 -- 判断是否是管理员
  // 管理员可以查看所有的文章列表（bug）
  if (userPermission[0].privilege === "管理员") {
    // sql模块 ① -- 查询所有的文章列表
    const articleList = await getArticleAllListModel();
    console.log(articleList)
  }
  // 普通用户只能查看自己的文章列表
  if (userPermission[0].privilege === "普通用户") {
    // console.log(userPermission);
    // 获取该用户的ID
    const getNormalUserId = await showArticleNormalUserIDModel(result.username)
    // console.log(getNormalUserId[0].id)
    // 通过ID获取到对应用户的文章列表
    const getNormalUserArticles = await showArticleNormalUserArticlesModel(getNormalUserId[0].id)
    // 遍历所有的数据并在其中添加该用户姓名
    getNormalUserArticles.forEach(item => {
      item.user_name = result.username
    })
    // 判断该用户是否有数据
    if (getNormalUserArticles.length > 0) {
      ctx.body = {
        code: 200,
        privilege: "普通用户",
        msg: "文章列表展示成功",
        data: getNormalUserArticles
      }
    } else {
      ctx.body = {
        code: 400,
        privilege: "普通用户",
        msg: "文章列表展示失败",
      }
    }
  }

}

module.exports.removeArticleCtrl = async (ctx, next) => { }