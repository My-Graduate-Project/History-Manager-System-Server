// 引入 mysql 模块
const { query } = require("../configs/mysql")

// 1.1 添加画作功能
module.exports.addArtWorkModel = async (
  artWork,
  artworkTitle,
  artworkSubTitle,
  artworkCreater,
  artworkDynasty,
  artworkDesc,
  artworkCreatePlace,
  artworkCreateTime,
  artworkStyle,
  artworkTexture,
  updateTime,
  userId
) => {
  // sql 语句
  const sql = `
  INSERT INTO artWork (
    artwork, 
    artwork_title, 
    artwork_subTitle, 
    artwork_creater, 
    artwork_dynasty, 
    artwork_description, 
    artwork_create_place,
    artwork_create_time, 
    artwork_styles_id,
    artwork_texture_id, 
    artwork_status,
    category_id,
    created_time,
    user_id
    ) 
    VALUES 
    ('${artWork}', 
    '${artworkTitle}', 
    '${artworkSubTitle}', 
    '${artworkCreater}', 
    '${artworkDynasty}', 
    '${artworkDesc}', 
    '${artworkCreatePlace}', 
    '${artworkCreateTime}', 
    '${artworkStyle}', 
    '${artworkTexture}',
    'auditing',
    '2',
    '${updateTime}',
    '${userId}')`

  // 返回
  return await query(sql)
}

// 2.1 管理员权限 --- 展示所有用户信息（分页天台做）
module.exports.showAllArtworkListModel = async () => {
  // sql 语句
  const sql = `SELECT * FROM artwork`
  // 返回
  return await query(sql)
}

// 2.2 普通用户权限 -- 展示自身所发送的画作信息
module.exports.showNormalUserArtworkModel = async (userId) => {
  // sql 语句
  const sql = `SELECT * FROM artwork WHERE user_id = ${userId}`
  // 返回
  return await query(sql)
}

// 2.3 获取画作风格
module.exports.showArtworkStyleModel = async () => {
  // sql 语句
  const sql = `SELECT * FROM artwork_styles`
  // 返回
  return await query(sql)
}

// 2.4 获取画作风格
module.exports.showArtworkTextureModel = async () => {
  // sql 语句
  const sql = `SELECT * FROM artwork_texture`
  // 返回
  return await query(sql)
}

// 3.1 删除画作
module.exports.deleteArtworkModel = async (artworkId) => {
  // sql 语句
  const sql = `UPDATE artwork SET artwork_status = 'delete' WHERE id='${artworkId}'`
  // 返回
  return await query(sql)
}

// 4.1 更新画作状态
module.exports.updateArtworkStatusModel = async (artworkId, status) => {
  // sql 语句
  const sql = `UPDATE artwork SET artwork_status = '${status}' WHERE id='${artworkId}'`
  // 返回
  return await query(sql)
}

// 5.1 回显画作
module.exports.echoArtworkModel = async (artworkId) => {
  // sql 语句
  const sql = `SELECT * FROM artwork WHERE id='${artworkId}'`
  // 返回
  return await query(sql)
}

// 6.1 搜索画作 -- 标题
module.exports.searchArtworkTitleModel = async (artworkTitle, start, end) => {
  // sql 语句
  const sql = `SELECT * FROM artwork WHERE artwork_title LIKE '%${artworkTitle}%' AND created_time BETWEEN '${start}' AND '${end}'`
  // 返回
  return await query(sql)
}

// 6.2 搜索画作 -- 创作者
module.exports.searchArtworkCreaterModel = async (artworkCreater, start, end) => {
  // sql 语句
  const sql = `SELECT * FROM artwork WHERE artwork_creater LIKE '%${artworkCreater}%' AND created_time BETWEEN '${start}' AND '${end}'`
  // 返回
  return await query(sql)
}

// 6.3 搜索画作 -- SubTitle
module.exports.searchArtworkSubTitleModel = async (artworkSubTitle, start, end) => {
  // sql 语句
  console.log(artworkSubTitle)
  const sql = `SELECT * FROM artwork WHERE artwork_subTitle LIKE '%${artworkSubTitle}%' AND created_time BETWEEN '${start}' AND '${end}'`
  // 返回
  return await query(sql)
}