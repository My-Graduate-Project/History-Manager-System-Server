const { query } = require("../configs/mysql")

module.exports.test = async () => {
  return await query("SELECT 1 + 1 AS solution")
}