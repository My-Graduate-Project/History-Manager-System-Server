const router = require('koa-router')()
// 引入方法
const { addArticleCtrl, showArticleListCtrl } = require('../controllers/articleCtrl')

// 1. 获取用户信息
router.post('/addArticle', addArticleCtrl)
// 2. 展示文章列表
router.get("/showArticleList", showArticleListCtrl)


module.exports = router
