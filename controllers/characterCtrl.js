const { showCharacterInfoModel } = require("../models/characterModel")

// 获取人物信息
module.exports.showCharacterInfoCtrl = async (ctx, next) => {
  const result = await showCharacterInfoModel();
  // console.log(result)
  ctx.body = {
    code: 200,
    data: result,
    msg: "获取人物信息成功"
  };
}