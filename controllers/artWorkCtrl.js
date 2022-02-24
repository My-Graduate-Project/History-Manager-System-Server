// 导入封装的用户信息
const { payload } = require("../utils/getTokenInfo")

// model -- artwork
const {
  addArtWorkModel,
  showAllArtworkListModel,
  showNormalUserArtworkModel,
  showArtworkStyleModel,
  showArtworkTextureModel,
  deleteArtworkModel,
  updateArtworkStatusModel,
  echoArtworkModel,
  searchArtworkTitleModel
} = require('../models/artWorkModel');
// model -- article_status
const {
  getUserIdModel,
  getUserPermissionModel,
  getUserNameModel,
  showArticleNormalUserIDModel
} = require('../models/articleModel');

// controller

// 1. 添加画作
module.exports.addArtworkCtrl = async (ctx, next) => {
  // 获取token
  const token = ctx.header.authorization
  // 解析token,获取用户信息
  let result = await payload(token);
  // sql 模块 ① -- 获取当前用户的id
  const userId = await getUserIdModel(result.username)
  // console.log(userId)
  // 获取参数
  const {
    artWork,
    artworkTitle,
    artworkSubTitle,
    artworkCreater,
    artworkDynasty,
    artworkDesc,
    artworkCreatePlace,
    artworkCreateTime,
    artworkStyle,
    artworkTexture,
    updateTime,
  } = ctx.request.body;
  // sql 模块 ② -- 添加画作的基本信息
  const artworkResult = await addArtWorkModel(
    artWork,
    artworkTitle,
    artworkSubTitle,
    artworkCreater,
    artworkDynasty,
    artworkDesc,
    artworkCreatePlace,
    artworkCreateTime,
    artworkStyle,
    artworkTexture,
    updateTime,
    userId[0].id
  )

  // 返回结果
  if (artworkResult) {
    ctx.body = {
      code: 200,
      msg: '添加画作成功',
      data: {
        artWorkId: artworkResult.insertId
      }
    }
  } else {
    ctx.body = {
      code: 400,
      msg: '添加画作失败'
    }
  }

}

// 2.1 展示画作信息
module.exports.showArtworkCtrl = async (ctx, next) => {
  // 获取token
  const token = ctx.header.authorization
  // 解析token,获取用户信息
  let result = await payload(token);
  // sql模块 -- 获取用户权限
  const userPermission = await getUserPermissionModel(result.username)
  // console.log(userPermission)
  // 管理员权限 -- 可以查看所有用户发布的画作信息并修改
  if (userPermission[0].privilege === "管理员") {
    // sql 模块 ① -- 获取所有画作信息
    const artworkResult = await showAllArtworkListModel()
    // 获取对应用户发送的请求参数
    const getAllUserNameList = await getUserNameModel();
    // 遍历所有文章列表
    artworkResult.forEach((item, index) => {
      getAllUserNameList.forEach((subItem, subIndex) => {
        if (item.user_id === subItem.id) {
          item.user_name = subItem.username
        }
      })
    })
    // 判断该用户是否有数据
    if (artworkResult.length > 0) {
      ctx.body = {
        code: 200,
        privilege: userPermission[0].privilege,
        msg: '获取画作信息成功',
        data: artworkResult
      }
    } else {
      ctx.body = {
        code: 400,
        privilege: userPermission[0].privilege,
        msg: '暂无画作信息'
      }
    }
  }
  // 普通用户权限 -- 只可以查看自身发布的画作信息
  if (userPermission[0].privilege === "普通用户") {
    // 获取用户id
    const getNormalUserId = await showArticleNormalUserIDModel(result.username)
    // console.log(getNormalUserId[0].id)
    // sql 模块 ① -- 获取所有画作信息
    const artworkResult = await showNormalUserArtworkModel(getNormalUserId[0].id)
    // 添加用户名
    artworkResult.forEach((item, index) => {
      item.user_name = result.username
    })
    // 判断该用户是否有数据
    if (artworkResult.length > 0) {
      ctx.body = {
        code: 200,
        privilege: userPermission[0].privilege,
        msg: '获取画作信息成功',
        data: artworkResult
      }
    } else {
      ctx.body = {
        code: 400,
        privilege: userPermission[0].privilege,
        msg: '暂无画作信息'
      }
    }
  }
}

// 2.2 展示画作的类型
module.exports.showArtworkStyleCtrl = async (ctx, next) => {
  const showArtworkStyleResult = await showArtworkStyleModel()
  ctx.body = {
    code: 200,
    msg: '获取画作类型成功',
    data: showArtworkStyleResult
  }
}

// 2.3 展示画作的材质
module.exports.showArtworkTextureCtrl = async (ctx, next) => {
  // 获取材质数据
  const showArtworkTextureResult = await showArtworkTextureModel()
  // 返回结果
  ctx.body = {
    code: 200,
    msg: '获取画作材质成功',
    data: showArtworkTextureResult
  }
}

// 3. 删除画作
module.exports.deleteArtworkCtrl = async (ctx, next) => {
  // 获取对应ID
  const { artworkId } = ctx.request.body;
  // sql 模块 ① -- 删除画作
  const deleteArtworkResult = await deleteArtworkModel(artworkId)
  // console.log(deleteArtworkResult)
  // 判断
  if (deleteArtworkResult.affectedRows > 0) {
    ctx.body = {
      code: 200,
      msg: '删除画作成功'
    }
  } else {
    ctx.body = {
      code: 400,
      msg: '删除画作失败'
    }
  }
}

// 4. 修改画作状态
module.exports.updateArtworkStatusCtrl = async (ctx, next) => {
  // 获取对应ID
  const { artworkId, status } = ctx.request.body;
  // sql 模块 ① -- 修改画作状态
  const updateArtworkStatusResult = await updateArtworkStatusModel(artworkId, status)
  // 判断
  if (updateArtworkStatusResult.affectedRows > 0) {
    ctx.body = {
      code: 200,
      msg: '修改画作状态成功'
    }
  } else {
    ctx.body = {
      code: 400,
      msg: '修改画作状态失败'
    }
  }
}

// 5. 回显画作信息
module.exports.echoArtworkCtrl = async (ctx, next) => {
  // 获取对应ID
  const { artworkId } = ctx.request.body;
  // sql 模块 ① -- 回显画作信息
  const echoArtworkResult = await echoArtworkModel(artworkId)
  // 获取对应用户发送的请求参数
  const getAllUserNameList = await getUserNameModel();
  // 添加用户名
  getAllUserNameList.forEach((item, index) => {
    if (echoArtworkResult[0].user_id === item.id) {
      echoArtworkResult[0].user_name = item.username
    }
  })
  // 判断
  if (echoArtworkResult.length > 0) {
    ctx.body = {
      code: 200,
      msg: '回显画作信息成功',
      data: echoArtworkResult
    }
  } else {
    ctx.body = {
      code: 400,
      msg: '回显画作信息失败'
    }
  }
}

// 6. 查询画作信息
module.exports.searchArtworkCtrl = async (ctx, next) => {
  // 获取要查找的画作名称、时间段
  const { artworkTitle, startTime, endTime } = ctx.request.body;
  console.log(artworkTitle, startTime, endTime)
  // sql 模块 ① -- 查询画作信息
  const searchArtworkResult = await searchArtworkTitleModel(artworkTitle, startTime, endTime)
  // 判断
  if (searchArtworkResult.length > 0) {
    return ctx.body = {
      code: 200,
      msg: '查询画作信息成功',
      data: searchArtworkResult
    }
  } else {
    return ctx.body = {
      code: 400,
      msg: '暂无画作信息'
    }
  }

}