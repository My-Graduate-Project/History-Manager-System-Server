const router = require('koa-router')()
// 引入方法
const { showCharacterInfoCtrl } = require('../controllers/characterCtrl')

// 1. 获取人物信息（已完成）
router.get('/showCharacterInfo', showCharacterInfoCtrl)


module.exports = router
