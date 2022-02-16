const router = require('koa-router')()
// 引入方法
const {
  addArticleCtrl,
  showArticleListCtrl,
  removeArticleCtrl,
  changeArticleStatusCtrl
} = require('../controllers/articleCtrl')

// 1. 获取用户信息
router.post('/addArticle', addArticleCtrl)
// 2. 展示文章列表
router.get("/showArticleList", showArticleListCtrl)
// 3. 删除文章
router.post("/removeArticle", removeArticleCtrl)
// 4. 修改文章状态
router.post("/changeArticleStatus", changeArticleStatusCtrl)


module.exports = router
