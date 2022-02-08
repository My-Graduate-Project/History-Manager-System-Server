const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)
const secret = 'history_ms'

// 导出个人信息
module.exports.personalCtrl = async (ctx, next) => {
  const token = ctx.header.authorization
  let payload
  if (token) {
    payload = await verify(token.split(' ')[1], secret)
    ctx.body = {
      code: 200,
      message: '获取个人信息成功',
      data: {
        username: payload.username
      }
    }
  } else {
    ctx.body = {
      message: 'token error',
      code: 0
    }
  }
}