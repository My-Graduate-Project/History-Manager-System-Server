const router = require('koa-router')()
// 引入方法
const { register } = require('../controllers/loginCtrl')

router.post('/register', register)

module.exports = router
