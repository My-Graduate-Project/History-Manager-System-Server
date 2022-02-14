const router = require('koa-router')()
// 引入方法
const { addArticleCtrl } = require('../controllers/articleCtrl')

// 1. 获取用户信息
router.post('/addArticle', addArticleCtrl)


module.exports = router
