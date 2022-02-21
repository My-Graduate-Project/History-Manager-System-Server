const router = require('koa-router')()
// 引入方法
const { addArtWorkCtrl } = require('../controllers/artWorkCtrl')

// 1. 获取用户信息
router.post('/addArtWork', addArtWorkCtrl)


module.exports = router
