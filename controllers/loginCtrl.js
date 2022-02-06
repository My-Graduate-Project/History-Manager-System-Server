// 校验数据
const Joi = require('joi')

// 引入加密模块
const { cryptoPaddword } = require('../utils/Md5')
const secret = 'jwt'
// 1. 引入 sql 查询文件


// 2. 定义登录模块检验
module.exports.register = async (ctx, next) => {
  // 获取 -- 用户名 密码 邮箱
  const { username, password, email } = ctx.request.body

  // 定义校验规则
  const schema = Joi.object({
    username: Joi.string().min(4).max(20).required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,20}$/).required(),
    email: Joi.string().email().required(),
  })
  // 校验数据
  const schemaResult = schema.validate({ username, password, email })
  // 判断校验结果
  if (schemaResult.error) {
    ctx.body = {
      code: 1,
      msg: '数据校验失败',
      data: [schemaResult.error.details[0].path[0], schemaResult.error.details[0].message]
    }
    return;
  }

  // 判断用户名是否存在

  // 加密
  // const result = await register(username, cryptoPaddword(password + secret), email)

  ctx.body = {
    code: 0,
    msg: '注册成功'
  }
  console.log(username, password, email)
}