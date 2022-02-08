const router = require('koa-router')()
// 引入方法
const { personalCtrl } = require('../controllers/personalCtrl')

// 1. 获取用户信息
router.post('/personal', personalCtrl)


module.exports = router
