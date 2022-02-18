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
  showArticleNormalUserArticlesModel,
  changeIsDeletedModel,
  changeArticleStatusResultModel
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
    created_time
  } = ctx.request.body
  // sql 模块 ① -- 获取当前用户的id
  const userId = await getUserIdModel(result.username)
  // sql模块 ② -- 添加文章的基本信息
  // console.log(userId)
  const detail = await addArticleDetailModel(
    title,
    description,
    category_id,
    views,
    article_status,
    created_time,
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

// 展示文章列表
module.exports.showArticleListCtrl = async (ctx, next) => {
  // 获取token
  const token = ctx.header.authorization
  // 获取pageNum,pageSize
  const { pageNum, pageSize } = ctx.request.body
  // 解析token,获取用户信息
  let result = await payload(token);
  // console.log(result)
  // sql模块 -- 获取用户权限
  const userPermission = await getUserPermissionModel(result.username)
  // 条件判断 -- 判断是否是管理员
  // 管理员可以查看所有的文章列表（bug）
  if (userPermission[0].privilege === "管理员") {
    // sql模块 ① -- 查询所有的文章列表
    const articleList = await getArticleAllListModel(pageNum, pageSize);
    // console.log(articleList)
    // 获取所有用户名
    const getAllUserNameList = await getUserNameModel();
    // 遍历所有文章列表
    articleList.forEach((item, index) => {
      getAllUserNameList.forEach((subItem, subIndex) => {
        if (item.user_id === subItem.id) {
          item.user_name = subItem.username
        }
      })
    })

    // console.log(articleList)
    // 判断获取列表中是否有数据
    if (articleList.length > 0) {
      ctx.body = {
        code: 200,
        privilege: "管理员",
        msg: "文章列表展示成功",
        data: articleList
      }
    } else {
      ctx.body = {
        code: 400,
        privilege: "管理员",
        msg: "未找到文章数据",
      }
    }
  }
  // 普通用户只能查看自己的文章列表
  if (userPermission[0].privilege === "普通用户") {
    // console.log(userPermission);
    // 获取该用户的ID
    const getNormalUserId = await showArticleNormalUserIDModel(result.username)
    // console.log(getNormalUserId[0].id)
    // 通过ID获取到对应用户的文章列表
    const getNormalUserArticles = await showArticleNormalUserArticlesModel(getNormalUserId[0].id, pageNum, pageSize)
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

// 删除文章
module.exports.removeArticleCtrl = async (ctx, next) => {
  // 获取要删除的ID
  const { id } = ctx.request.body;
  // sql模块 -- 根据要删除的ID修改属性
  const removeData = await changeIsDeletedModel(id);
  // 判断
  if (removeData) {
    ctx.body = {
      code: 200,
      msg: "删除文章成功"
    }
  } else {
    ctx.body = {
      code: 400,
      msg: "删除文章失败"
    }
  }
}

// 修改文章状态
module.exports.changeArticleStatusCtrl = async (ctx, next) => {
  // 获取token
  const token = ctx.header.authorization
  // 解析token,获取用户信息
  let result = await payload(token);
  // console.log(result)
  // sql模块 -- 获取用户权限
  const userPermission = await getUserPermissionModel(result.username)
  if (userPermission[0].privilege === "管理员") {
    const { id, article_status } = ctx.request.body;
    // sql模块 -- 根据对应文章ID修改该状态
    const changeArticleStatusResult = await changeArticleStatusResultModel(id, article_status);
    // 判断
    if (changeArticleStatusResult) {
      ctx.body = {
        code: 200,
        privilege: "管理员",
        msg: "修改文章状态成功"
      }
    } else {
      ctx.body = {
        code: 400,
        privilege: "管理员",
        msg: "修改文章状态失败"
      }
    }
  } else {
    ctx.body = {
      code: 400,
      privilege: "普通用户",
      msg: "非管理员不可修改文章状态"
    }
  }
}