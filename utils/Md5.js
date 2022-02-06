
const crypto = require('crypto');

// 封装一个加密方法  
// 参数：用户注册的密码 拼接 一个字符串 合并后的字符串
// 返回值： 返回一个Md5加密的密文
module.exports.cryptoPaddword = (password) => {
  return crypto.createHash('MD5').update(password).digest('hex');
}