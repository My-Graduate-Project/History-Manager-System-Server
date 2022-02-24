const router = require('koa-router')()
// 引入方法
const {
  addArtworkCtrl,
  showArtworkCtrl,
  showArtworkStyleCtrl,
  showArtworkTextureCtrl,
  deleteArtworkCtrl,
  updateArtworkStatusCtrl,
  echoArtworkCtrl,
  searchArtworkCtrl
} = require('../controllers/artWorkCtrl')

// 1. 获取用户信息（已完成）
router.post('/addArtwork', addArtworkCtrl)
// 2.1 展示画作信息（已完成）
router.get("/showArtwork", showArtworkCtrl)
// 2.2 展示画作的类型（已完成）
router.get("/showArtworkStyle", showArtworkStyleCtrl)
// 2.3 展示画作的材质（已完成）
router.get("/showArtworkTexture", showArtworkTextureCtrl)
// 3. 删除画作信息（已完成）
router.post('/deleteArtwork', deleteArtworkCtrl)
// 4. 修改画作状态（已完成）
router.post('/updateArtworkStatus', updateArtworkStatusCtrl)
// 5. 回显画作信息（已完成）
router.post('/echoArtwork', echoArtworkCtrl)
// 6. 查询画作信息（已完成）
router.post('/searchArtwork', searchArtworkCtrl)


module.exports = router
