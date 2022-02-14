// 校验数据
const Joi = require('joi')
// 引入jwt
const jwt = require('jsonwebtoken');

// 引入加密模块
const { cryptoPaddword } = require('../utils/Md5')
const secret = 'jwt'
const jwtSecret = "history_ms"
// 1. 引入 model 查询文件
const { registerModel, userIsExistModel, loginModel } = require("../models/loginModel")


// 2. 定义登录模块检验
module.exports.registerCtrl = async (ctx, next) => {
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
  const user = await userIsExistModel(username);
  if (user[0]) {
    ctx.body = {
      status: 0,
      message: '您已注册,无需重复注册'
    }
    return;
  }

  // 加密
  await registerModel(username, cryptoPaddword(password + secret), email)

  ctx.body = {
    code: 0,
    msg: '注册成功'
  }
}

// 用户登录模块功能
module.exports.loginCtrl = async (ctx, next) => {
  // 1. 获取用户名 密码
  const { username, password } = ctx.request.body
  // 用户查询
  const result = await loginModel(username, cryptoPaddword(password + secret))
  // 用户是否存在
  if (result[0]) {
    // 根据用户名和密码生成token
    const token = jwt.sign({
      username,
      password
    }, jwtSecret, { expiresIn: '12h' });
    ctx.body = {
      status: 200,
      data: {
        token
      },
      message: '登录成功'
    }
  } else {
    ctx.body = {
      status: 0,
      message: '登录失败，请检查用户名或者密码'
    }
  }
}