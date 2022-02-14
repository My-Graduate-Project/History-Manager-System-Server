const router = require('koa-router')()
// 引入方法
const { personalCtrl } = require('../controllers/articleCtrl')

// 1. 获取用户信息
router.post('/addArticle', personalCtrl)


module.exports = router
