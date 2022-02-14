const { payload } = require("../utils/getTokenInfo")
// model
// const { permissionModel } = require("../models/articleModel")

// 导出个人信息
module.exports.personalCtrl = async (ctx, next) => {
  const token = ctx.header.authorization
  let result = await payload(token);
  console.log(result)
  if (token) {
    ctx.body = {
      code: 200,
      message: '获取个人信息成功',
    }
  } else {
    ctx.body = {
      message: 'token error',
      code: 0
    }
  }
}
