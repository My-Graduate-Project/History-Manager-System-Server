const { payload } = require("../utils/getTokenInfo")

// model
const { permissionModel } = require("../models/personalModel")

// 导出个人信息
module.exports.personalCtrl = async (ctx, next) => {
  const token = ctx.header.authorization
  // 获取用户权限
  let result
  // 从 token 中获取用户信息
  let info
  if (token) {
    info = await payload(token)
    result = await permissionModel(info.username)
    ctx.body = {
      code: 200,
      message: '获取个人信息成功',
      data: {
        username: info.username,
        privilege: result[0].privilege
      }
    }
  } else {
    ctx.body = {
      message: 'token error',
      code: 0
    }
  }
}
