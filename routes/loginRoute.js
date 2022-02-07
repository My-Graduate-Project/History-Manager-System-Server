const router = require('koa-router')()
// 引入方法
const { registerCtrl, loginCtrl } = require('../controllers/loginCtrl')

// 1. 用户注册
router.post('/register', registerCtrl)

// 2. 用户登录
router.post('/login', loginCtrl)

module.exports = router
