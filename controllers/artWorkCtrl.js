// model
const {

} = require('../models/artWorkModel');

// 添加画作
module.exports.addArtWorkCtrl = async (ctx, next) => {
  ctx.body = {
    code: 200,
    msg: '添加画作成功'
  }
}