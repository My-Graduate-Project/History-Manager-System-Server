const router = require('koa-router')()
const { test } = require('../controllers/test')

router.get('/home', test)

module.exports = router
