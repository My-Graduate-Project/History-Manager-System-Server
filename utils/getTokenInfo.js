const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)
const secret = 'history_ms'

module.exports.payload = async (token) => {
  let result = await verify(token.split(' ')[1], secret)
  return result;
}

